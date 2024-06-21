export {}
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import open from 'open';
import express from 'express';

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const admin_users = process.env.ADMIN_USERS;
const app = express()

app.set('view engine', 'ejs');
app.get('/hello', function (req, res) {
    const data = {
        firstName: req.query.firstname,
    };

    res.render('pages/bot', data);
})

app.listen(3000)

import client from './client';


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        open(`http://localhost:3000/hello?firstname=${msg.from.first_name}`);
        client.connect().then(() => {
            
        })

        // bot.sendMessage(chatId, `Hello, ${msg.from.first_name}!`);
    }
    else if (messageText == '/adminhello') {
        if (admin_users.includes(msg.from.id)) return;
        const chatId = msg.chat.id;

        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, 'Received your message');
    }
});