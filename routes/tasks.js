const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET

// Serve the tasks page
router.get('/', async function(req, res, next) {
    console.log("GET route for /tasks");
    try {
        const tasks = await Task.find();
        res.render('./tasks/viewTasks', { title: 'View Tasks', tasks});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Serve the add task page
router.get('/add', async function(req, res, next) {
    console.log("GET route for /add");
    res.render('./tasks/addTask', { title: 'Add Task'});
});

// Serve the edit task page
router.get('/edit/:_id', async function(req, res, next) {
    console.log("GET route for /edit");

    //Find the task in the database
    try {
        const task = await Task.findOne({_id: req.params._id});
        res.render('./tasks/editTask', { title: 'Edit Task', task});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});

// Serve the delete task page
router.get('/delete/:_id', async function(req, res, next) {
    console.log("GET route for /edit");

    //Delete the task from the database
    try {
        let currentTask = await Task.findOne({_id: req.params._id});
        await currentTask.deleteOne();
        console.log("Task deleted from the database");
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});

// POST

// POST route for /add
router.post('/add', async function(req, res, next) {
    console.log("POST route for /add");

    //Process the form data and add the task to the database
    const { name, description, message, interval } = req.body;
    const date = new Date();
    const newTask = new Task({
        name,
        description,
        date,
        message,
        interval
    });

    //Save the task to the database
    try {
        const task = await newTask.save();
        console.log("Task saved to the database");
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST route for /edit
router.post('/edit', async function(req, res, next) {
    console.log("POST route for /edit");

    try {
        //Find the task in the database
        let currentTask = await Task.findOne({_id: req.body._id});

        //Update the task in the database with the new selctions
        currentTask.name = req.body.name;
        currentTask.description = req.body.description;
        currentTask.message = req.body.message;
        currentTask.interval = req.body.interval;

        await currentTask.save();
        console.log("Task updated in the database");
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});


module.exports = router;