var dotenv = require('dotenv').config();
var Client = require('discord.js').Client;
var GatewayIntentBits = require('discord.js').GatewayIntentBits;

// Get the Bot token and Client ID from the environment variables. Use the globals file for this after
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

class DiscordBot {
    client;
    channel;
    token;
    channelID;

    constructor(){
        this.token = TOKEN;
        this.channelID = CHANNEL_ID;

        console.log('Bot constructed')
    }

    async init() {
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
        await this.client.login(this.token);

        await this.client.once('ready', () => {
            console.log('Bot ready');
            this.channel = this.setChannel();
        });
    }

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
        //Send a message to the channel
        if(!this.channel){
            this.channel = await this.setChannel();
        }

        await this.channel.send(message)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    }

    async getMessages(){
        //Get the last 10 messages from the channel
        if(!this.channel){
            this.channel = await this.setChannel();
        }

        var messagesList = await this.channel.messages.fetch();

        return messagesList;
    }
}

module.exports = DiscordBot;