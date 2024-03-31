var Client = require('discord.js').Client;
var GatewayIntentBits = require('discord.js').GatewayIntentBits;
var Message = require('./message.js');
const configs = require('../configs/globals');
const send = require('send');

/*
    Object-oriented representation of a Discord bot, using the discord.js library.

    This can all be done more simply without the class, or simply done in the index.js file, but creating a class 
    is a good way to separate the logic and make the application more extensible in the future (eg. one server, multiple bots)

    Implementation adapted from https://discord.js.org/docs/packages/discord.js/14.14.1
    
    
*/

class DiscordBot {
    client;
    channel;
    token;
    channelID;
    initialized = false;

    // Constructor takes no parameters, but if application is to be expanded it should take the token and channelID as parameters
    constructor(){
        this.token = configs.Discord.Token;
        this.channelID = configs.Discord.ChannelID;

        console.log('Bot constructed')

    }

    // Initialize the bot
    async init() {
        this.client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions]}); // This intent is required for the bot to see the content of messages it did not send itself
        await this.client.login(this.token);

        await this.client.once('ready', () => {
            console.log('Bot ready');
        });
        
        this.channel = await this.setChannel();

        this.initialized = true;

        // Configures the client to listen for messages and respond.
        // https://discord.js.org/docs/packages/discord.js/14.14.1/Client:Class#messageCreate
        this.client.on('messageCreate', message => {
            if (message.author.bot) return; // Prevent the bot from responding to itself
        
            var messageObj = new Message(message.content, message.author.username);
        
            console.log(`Received message: ${messageObj.content}`);
            this.sendMessage('Automatic response! I like your message!');
        });

        this.client.on('messageReactionAdd', (reaction, user) => {
            if (user.bot) return; // Prevent the bot from reacting to itself
        
            console.log(`Received reaction: ${reaction.emoji}`);
            this.sendMessage('Someone reacted to my message!');
        });
    }

    // Set the channel.
    async setChannel(){
        return new Promise((resolve, reject) => {
            this.client.channels.fetch(this.channelID)
                .then(channel => {
                    this.channel = channel;
                    resolve(this.channel);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    // Send a text message to the channel
    async sendMessage(message){

        await this.channel.send(message)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    }

    // Get the past messages from the channel (up to 50)
    async getMessages(){

        const messagesList = await this.channel.messages.fetch();

        var messages = [];

        for(let message of messagesList){
            var content = message[1].content;
            var sender = message[1].author.username;
            const msg = new Message(content, sender);
            messages.push(msg);
        }

        messages.reverse();

        return messages;
    }

    // Accepts an image url and sends it to the channel
    async sendImage(imgUrl){
        
        const args = {files: [imgUrl]};

        await this.channel.send(args)
    }

}

var bot = new DiscordBot();

module.exports = bot;