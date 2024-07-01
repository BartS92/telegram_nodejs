import Client from './client';

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


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}

const client = new Client(config);

bot.on('message', (msg) => {

    const commandText = msg.text;
    if (commandText === '/start') {
        open(`http://localhost:3000/hello?firstname=${msg.from.first_name}`);
        console.log(msg.chat.id);
        client.addUser({id: msg.from.id, chatId:msg.chat.id, firstName:  msg.from.first_name, lastName: msg.from.last_name }).

    }
    else if (commandText.includes('/adminhello')) {
        const messages = commandText.split(' ');
        const telegramId = messages[1];
        if (process.env.ADMIN_USERS.includes(telegramId)){
            const adminText = commandText.replace(messages[0], '').replace(messages[1], '');
            client.getUser(){

            }
        }
        else {
            bot.sendMessage(msg.chat.id, "You are not admin. It is not allowed to send message");
        }

    }
});