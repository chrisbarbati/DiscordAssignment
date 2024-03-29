var express = require('express');
var router = express.Router();
var DiscordBot = require('../models/discordBot.js');

var bot; //Holds our bot

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Discord Application' });
});


router.get('/sendmessage', async function(req, res, next) {
  if(!bot){
    bot = new DiscordBot();
    //Wait until DiscordBot is constructed and client and channel are set before sending a message
    await bot.init();
  }

  res.render('chat', { title: 'Chat' });
});

//Accept a post request and send a message to the Discord channel
router.post('/sendmessage', async function(req, res, next) {
  if(!bot){
    bot = new DiscordBot();
    //Wait until DiscordBot is constructed and client and channel are set before sending a message
    await bot.init();
  }else{
    bot.sendMessage(req.body.message);
  }

  res.render('index', { title: 'Chat' });
});



module.exports = router;