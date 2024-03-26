var dotenv = require('dotenv').config();
var Client = require('discord.js').Client;
var GatewayIntentBits = require('discord.js').GatewayIntentBits;

// Get the Bot token and Client ID from the environment variables
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

        return new Promise((resolve, reject) => {
            this.client.once('ready', () => {
                this.channel = this.setChannel();
                
                while(this.channel == null){
                    //Do nothing. Unclear why this is necessary but the code breaks without it
                }});

                console.log('Bot initialized');

                resolve();
        });
    }

    setChannel(){
        //Get the channel by ID
        var channel = this.client.channels.cache.get(CHANNEL_ID);

        console.log('Channel set')

        return channel;
    }

    sendMessage(message){
        //Send a message to the channel
        if(!this.channel){
            this.channel = this.setChannel();
        }

        this.channel.send(message)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    }
}

module.exports = DiscordBot;