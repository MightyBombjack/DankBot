var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var imgflip = require('./imgflip')
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', async function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');
        console.log("args:")
        let cmd = args[0];
        let messageContent;
        args = args.splice(1);
        console.log(args);
        switch (cmd) {

            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            // Just add any case commands if you want to..
            case 'getMemes':
                bot.sendMessage({
                    to: userID,
                    message: `${user} ${userID} gotMemes!`
                })
                break;
            case 'searchMemes':
                messageContent = await imgflip.searchMemes(args[0])
                bot.sendMessage({
                    // to: userID,
                    to: channelID,
                    message: messageContent
                })
                break;
            case 'preview':
                // TODO
                /*
                    rework this command, img previews aren't aways right
                */

                messageContent = await imgflip.showPreview(args.toString())
                bot.sendMessage({
                    // to: userID,
                    to: channelID,
                    message: messageContent
                })
                break;
        }
    }
});