import { createPool, OkPacket, Pool, RowDataPacket } from 'mysql2/promise';

let pool: Pool | null = null;

export const getPool = (): Pool => {
    if (pool !== null) { return pool; }
    pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    return pool;
};

export const select = async (query: string, params: any[]): Promise<RowDataPacket[]> => {
  const res = await getPool().execute(query, params);
  return res[0] as RowDataPacket[];
};

export const generateInsertStatement = (
  tableName: string, params: { [key: string]: any }): [string, any[]] => {

  const keys = Object.keys(params);
  const placeholders = keys.map(() => '?');
  const sql = `INSERT INTO ${tableName}
    (${keys.join(', ')})
  VALUES
    (${placeholders.join(', ')})`;
  return [sql, keys.map((k) => params[k])];
};

export const insert = async (
  tableName: string, data: { [key: string]: any }): Promise<OkPacket> => {
  const [query, params] = generateInsertStatement(tableName, data);
  const res = await getPool().execute(query, params);
  return res[0] as OkPacket;
};

export const generateUpdateStatement = (
  tableName: string,
  setParams: { [key: string]: any },
  where: { [key: string]: any },
): [string, any[]] => {

  const keys = Object.keys(setParams);
  const sets = keys.map((k) => `${k} = ?`);
  const wkeys = Object.keys(where);
  const ws = wkeys.map((k) => `${k} = ?`);

  const sql = `UPDATE ${tableName} SET
    ${sets.join(', ')}
    WHERE ${ws.join(' AND ')}`;

  const params = keys.map((k) => setParams[k]);
  const wp = wkeys.map((k) => where[k]);
  wp.forEach((w) => {
    params.push(w);
  });
  return [sql, params];
};

export const update = async (
  tableName: string,
  setParams: { [key: string]: any },
  where: { [key: string]: any }): Promise<OkPacket> => {
  const [query, params] = generateUpdateStatement(tableName, setParams, where);
  const res = await getPool().execute(query, params);
  return res[0] as OkPacket;
};
