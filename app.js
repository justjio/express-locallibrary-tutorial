var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Added new catalog route below
var catalogRouter = require('./routes/catalog');

//Require compression
var compression = require('compression');
//Require helmet
var helmet = require('helmet');

var app = express();

//Set up mongoose
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://jiobiagbaDB:obidudu9293@cluster0-ywgnl.azure.mongodb.net/local_library?retryWrites=true';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Add helmet as a middleware
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Get compression as a middleware before all routes intended to be compressed.
app.use(compression());

//Routes can now follow
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Add catalog route here also
app.use('/catalog', catalogRouter);


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
