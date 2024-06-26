import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import Logger from './logger';
dotenv.config();

const state = {
    // @ts-ignore
    pool: null
};

const connect = async (): Promise<void> => {
    state.pool = await mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    await state.pool.getConnection(); // Check connection
    Logger.info(`Successfully connected to database`)
    return
};

const getPool = () => {
    return state.pool;
};

export { connect, getPool }
