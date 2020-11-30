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
                msg.channel.send(`${msg.author.username} rolled some dice`);

                // 1) step is to see if they want to roll multiple dice. they will be separated by a comma, if no comma found then singular roll
                const dice = params.includes(',') ? params.split(',') : [params];

                // 2) Iterate over the array rolling the appropriate dice
                dice.forEach(die => {
                    // verify that the die is of correct format
                    if (die.toLowerCase().includes('d')) {
                        const [count, sides] = die.split('d');

                        // lets roll the die now
                        let dieRolls = [];

                        for (let index = 1; index <= count; index++) {
                            const result = Math.floor(Math.random() * sides) + 1;
                            dieRolls[index-1] = result;
                            
                        }
                        msg.reply(`Roll for ${die}: ${dieRolls.join(', ')}`);
                    } else {
                        // the die was invalid let the user know
                        msg.reply(`The roll of ${die} was invalid, format is (x)d(y), where (x) is the number of die and (y) is how many sides it has`);
                    }
                });


            } else {
                // didn't suppy the params
                msg.reply('You must tell me how many of what dice to roll!');
            }
        }
    }
})