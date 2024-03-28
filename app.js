var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// Add the router for tasks
var tasksRouter = require('./routes/tasks');
var usersRouter = require('./routes/users');

// Import mongoose

var mongoose = require('mongoose');
//var configs = require('./configs/globals'); // Commented out for now, not in use and breaks the app. //TODO: Revisit this

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Use the router for tasks
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://200390696:3H479oIv1FLYfuZu@discordassignment.vcryjkk.mongodb.net/?retryWrites=true&w=majority&appName=DiscordAssignment').then( // TODO: Use the globals variable for this later. Leaving it as plain-text is poor practice
  () => {console.log('Connected to MongoDB')},
  err => {console.error('Error connecting to MongoDB')}
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
