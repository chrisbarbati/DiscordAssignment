var dotenv = require('dotenv').config();
var Client = require('discord.js').Client;
var GatewayIntentBits = require('discord.js').GatewayIntentBits;

// Get the Bot token and Client ID from the environment variables
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

/*
    Test script to establish basic Discord bot functionality.

    Bug: Sometimes first page load does not cause message to send, but subsequent page loads do.
    Bug: Sometimes message does not send at all.
*/

async function main(){
    //Create a new client
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    //Login to the client
    await client.login(TOKEN);

    //When the client is ready, log a message to the console and send a message to the channel
    client.once('ready', () => {
        console.log('Client is Ready!');

        //Get the channel by ID
        const channel = client.channels.cache.get(CHANNEL_ID);

        //If I remove this line everything breaks, so I'm keeping it here for now. Something to do with concurrency.
        console.log(channel);
        
        // Send a basic message
        channel.send('hello5!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    });
    
}

module.exports = {main};