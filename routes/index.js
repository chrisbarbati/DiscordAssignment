var express = require('express');
var router = express.Router();
var discord = require('../public/javascripts/discordTest.js');


/* GET home page. */
router.get('/', async function(req, res, next) {

  await discord.main();

  res.render('index', { title: 'Express' });
});

module.exports = router;