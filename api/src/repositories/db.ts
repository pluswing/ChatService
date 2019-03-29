import * as mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export default (): mysql.Pool => {
    if (pool !== null) return pool;

    pool = mysql.createPool({
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
