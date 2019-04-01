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

export const insert = async (query: string, params: any[]): Promise<OkPacket> => {
    const res = await getPool().execute(query, params);
    return res[0] as OkPacket;
};
