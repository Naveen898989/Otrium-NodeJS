import mysql from 'mysql';
import config from '../util/config';

const connection = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection({
            host: config.dbConfig.DB_HOST,
            user: config.dbConfig.DB_USER,
            password: config.dbConfig.DB_PASSWORD,
            database: config.dbConfig.DB_NAME
        });

        connection.connect((error: any) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        });
    });

const query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        console.log('Query: ' + query);
        connection.query(query, (error: any, result: any) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

export default { connection, query };