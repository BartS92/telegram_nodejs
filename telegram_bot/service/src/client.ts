import { TelegramUser } from './types/TelegramTypes';

export {}
import pg from 'pg';


const config = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
}

export default class Client {
    client: pg.Client;

    constructor(config: {}) {
        this.client = new pg.Client(config);
    }

    public addUser (user:TelegramUser) {
        this.client.connect().then(() => {
            this.client.query(`SELECT telegram_id FROM users WHERE telegram_id=${user.id}`, (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result:', result.rows);
                    if (result.rows.length === 0) {
                        const data  = [user.id, user.chatId, user.firstName, user.lastName];
                        this.client.query('INSERT INTO users (telegram_id, chat_id, first_name, last_name) VALUES ($1, $2, $3, $4)', data, (err, result) => {
                            if (err) {
                                console.error('Error executing query', err);
                            } else {
                                console.log('Query result:', result.rows);
                            }

                            this.closeConnection();
                        });
                    }
                }
            })

        })
    }

    public getUser(telegramId: number, text: string, callBack: ()=> void){
        this.client.connect().then(() => {

            this.client.query(`SELECT chat_id FROM users WHERE telegram_id=${telegramId}`, (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    if (result.rows.length === 0) {
                        console.log(`telegram id =${telegramId} doesnt exist in DB`);
                    }
                    else {
                        console.log(`telegram id =${telegramId} exits in DB`);
                        bot.sendMessage(result.fields[0], adminText);
                    }
                }

                this.closeConnection();;
            });
        })
    }

    private closeConnection () {

        this.client.end()
            .then(() => {
                console.log('Connection to PostgreSQL closed');
            })
            .catch((err) => {
                console.error('Error closing connection', err);
            });
    }
}