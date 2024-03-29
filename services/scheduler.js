const schedule = require('node-schedule');

/*
    Handles the scheduling of tasks.

    Simple demonstration for now

    TODO: Implement actual task scheduling functionality for all tasks in the database, and refresh the schedule when tasks are added/removed/edited
*/

const job = schedule.scheduleJob('* * * * *', function(){
    console.log('Scheduled job ran at ' + new Date());
  });

module.exports = job;