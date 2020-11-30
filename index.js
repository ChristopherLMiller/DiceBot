require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

// log the bot in
bot.login(TOKEN);

// check if the bot is ready
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

// now process messages
bot.on('message', msg => {
    const [command, params] = msg.content.split(' ');


    switch (command) {
        case 'roll':
        case '!roll': {
            // first check that they supplied the params, needed
            if (params) {
                msg.channel.send(`${msg.author.username} rolled ${params}`);

                // grab how many and what kind of dice
                const [count, sides] = params.split('d');

                msg.reply(`Rolling ${count} ${sides}-sided dice`)
            } else {
                msg.reply('You must tell me how many of what dice to roll!');
            }
        }
    }
})