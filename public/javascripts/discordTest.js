var dotenv = require('dotenv').config();
var Client = require('discord.js').Client;
var GatewayIntentBits = require('discord.js').GatewayIntentBits;

// Get the Bot token and Client ID from the environment variables
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

var client; //Holds the Discord client
var channel; //Holds the channel to send messages to

/*
    Test script to establish basic Discord bot functionality.
*/

async function main(){
    const message = new Date().toString();

    if(!client){
        //If the client does not exist, get the client and channel then send a message
        await getClient();
        await getChannel(client);
        await sendMessage(channel, message);
    }else if(!channel){
        //If the channel does not exist, get the channel
        await getChannel(client);
        await sendMessage(channel, message);
    }
    else{
        //If the client and channel exist, send a message
        await sendMessage(channel, message);
    }
}

async function getClient(){
    //Create a new client
    client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    //Login to the client
    await client.login(TOKEN);

    //When the client is ready, log a message to the console and send a message to the channel
    client.once('ready', () => {
        console.log('Client is Ready!');    
        getChannel();
    });

    this.client = client;
}

async function getChannel(client){
        //Get the channel by ID
        channel = client.channels.cache.get(CHANNEL_ID);

        //If I remove this line everything breaks, so I'm keeping it here for now. Something to do with concurrency.
        console.log(channel);
        
        this.channel = channel;
}

async function sendMessage(channel, message){
    //Send a message to the channel
    channel.send(message)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
}

module.exports = {main};