var dotenv = require('dotenv').config();
var Client = require('discord.js').Client;
var GatewayIntentBits = require('discord.js').GatewayIntentBits;
var Message = require('./message.js');

// Get the Bot token and Client ID from the environment variables. Use the globals file for this after
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

class DiscordBot {
    client;
    channel;
    token;
    channelID;
    initialized = false;

    constructor(){
        this.token = TOKEN;
        this.channelID = CHANNEL_ID;

        console.log('Bot constructed')
    }

    // Initialize the bot
    async init() {
        this.client = new Client({ intents: [GatewayIntentBits.MessageContent] });
        await this.client.login(this.token);

        await this.client.once('ready', () => {
            console.log('Bot ready');
        });

        
        this.channel = await this.setChannel();

        this.initialized = true;
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

    async sendMessage(message){

        // Takes time to reinitialize the bot every time the message is sent, but I encountered periodic issues otherwise. //TODO: Investigate this further
        
        //await this.init();
        //await this.setChannel();

        await this.channel.send(message)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    }

    async getMessages(){

        //TODO: See above

        //await this.init();
        //await this.setChannel();

        const messagesList = await this.channel.messages.fetch({ limit: 10 });

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
}

module.exports = DiscordBot;