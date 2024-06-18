const TelegramBot = require('node-telegram-bot-api')

const token = '388903533:AAHuxPWcATemi_gC70uLx0Sp5OHFt0VVWuI';

const bot = new TelegramBot(token, {polling: true});

const admin_users = [101703224]


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }
    if (messageText == '/adminhello') {
        if (admin_users.includes(msg.from.id)) return;
        const chatId = msg.chat.id;

        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, 'Received your message');
    }

});