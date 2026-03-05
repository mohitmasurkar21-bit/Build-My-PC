import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import { Sequelize } from 'sequelize';

const isProduction = process.env.NODE_ENV === 'production';
const useMysql = process.env.USE_MYSQL === 'true';

let sequelize;

if (isProduction || useMysql) {
    sequelize = new Sequelize(
        process.env.DB_NAME || 'buildmypc',
        process.env.DB_USER || 'root',
        process.env.DB_PASS || '',
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
} else {
    // Fallback to SQLite for local development
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'database.sqlite'),
        logging: false
    });
    console.log('ℹ️ Using SQLite database for local development');
}

export default sequelize;
