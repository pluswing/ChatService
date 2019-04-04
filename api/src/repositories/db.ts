import { createPool, Pool, RowDataPacket, OkPacket } from 'mysql2/promise';

let pool: Pool | null = null;

export const getPool = (): Pool => {
    if (pool !== null) return pool;

    pool = createPool({
        host: 'mysql',
        user: 'root',
        password: 'root',
        database: 'chatservice',
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
    return [sql, keys.map(k => params[k])];
};

export const insert = async (
    tableName: string, data: { [key: string]: any }): Promise<OkPacket> => {
    const [query, params] = generateInsertStatement(tableName, data);
    const res = await getPool().execute(query, params);
    return res[0] as OkPacket;
};

export const update = async (query: string, params: any[]): Promise<OkPacket> => {
    const res = await getPool().execute(query, params);
    return res[0] as OkPacket;
};
