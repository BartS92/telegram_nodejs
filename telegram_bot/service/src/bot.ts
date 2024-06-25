export {}
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import open from 'open';
import express from 'express';

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const app = express()

app.set('view engine', 'ejs');
app.get('/hello', function (req, res) {
    const data = {
        firstName: req.query.firstname,
    };

    res.render('pages/bot', data);
})

app.listen(3000)

import pg from 'pg';


const config = {
    user: 'postgres',
    password: 'postgres',
    host: '0.0.0.0',
    port: '5432',
    database: 'postgres',
}

const client = new pg.Client(config);

bot.on('message', (msg) => {

    const commandText = msg.text;
    if (commandText === '/start') {
        open(`http://localhost:3000/hello?firstname=${msg.from.first_name}`);
        console.log(msg.chat.id);
        client.connect().then(() => {
            client.query(`SELECT telegram_id FROM users WHERE telegram_id=${msg.from.id}`, (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result:', result.rows);
                    if (result.rows.length === 0) {
                        const data  = [msg.from.id, msg.chat.id, msg.from.first_name, msg.from.last_name];
                        client.query('INSERT INTO users (telegram_id, chat_id, first_name, last_name) VALUES ($1, $2, $3, $4)', data, (err, result) => {
                            if (err) {
                                console.error('Error executing query', err);
                            } else {
                                console.log('Query result:', result.rows);
                            }

                            client.end()
                                .then(() => {
                                    console.log('Connection to PostgreSQL closed');
                                })
                                .catch((err) => {
                                    console.error('Error closing connection', err);
                                });
                        });
                    }
                }
            })

        })

    }
    else if (commandText.includes('/adminhello')) {
        const messages = commandText.split(' ');
        const telegramId = messages[1];
        if (process.env.ADMIN_USERS.includes(telegramId)){
            const adminText = commandText.replace(messages[0], '').replace(messages[1], '');
            client.connect().then(() => {

                client.query(`SELECT chat_id FROM users WHERE telegram_id=${telegramId}`, (err, result) => {
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

                    client.end()
                    .then(() => {
                        console.log('Connection to PostgreSQL closed');
                    })
                    .catch((err) => {
                        console.error('Error closing connection', err);
                    });
                });
            })
        }
        else {
            bot.sendMessage(msg.chat.id, "You are not admin. It is not allowed to send message");
        }

    }
});