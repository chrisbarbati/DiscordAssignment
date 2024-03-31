var express = require('express');
var router = express.Router();
var DiscordBot = require('../models/discordBot.js');
var Message = require('discord.js').Message;

var bot = new DiscordBot; //Holds our bot

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!bot.initialized){
    //Wait until DiscordBot is constructed and client and channel are set before sending a message
    await bot.init();
  }

  //bot.sendImage('https://media.4-paws.org/f/3/9/1/f39115c5c798651f95141c37b692f76b669af761/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.webp');

  res.render('index', { title: 'Discord Application' });
});


router.get('/chat', async function(req, res, next) {
  if(!bot.initialized){
    //Wait until DiscordBot is constructed and client and channel are set before sending a message
    await bot.init();
  }

  var messagesList = await bot.getMessages();
  
  for(let message of messagesList){
    //console.log(message.content);
  }

  res.render('chat', { title: 'Chat', messages: messagesList });
});


//Accept a post request and send a message to the Discord channel
router.post('/chat', async function(req, res, next) {
  if(!bot.initialized){
    //Wait until DiscordBot is constructed and client and channel are set before sending a message
    await bot.init();
  }
  
  await bot.sendMessage(req.body.message);

  res.redirect('/chat');
});



module.exports = router;