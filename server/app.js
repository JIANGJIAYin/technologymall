var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var phones = require('./routes/phones');
var earPhones = require('./routes/earPhones');
var cameras = require('./routes/cameras');
var wearTechs = require('./routes/wearTechs');
var noteBooks = require('./routes/noteBooks');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//登录拦截
app.use((req,res,next)=>{
  let userId=req.cookies.userId;
  if (userId) {
    next();
  } else {
    if (req.path=='/users/login' || req.path=='/users/checkLogin' || req.path=='/phones/list' || req.path=='/earPhones/list' || req.path=='/cameras/list' || req.path=='/wearTechs/list' || req.path=='/noteBooks/list') {
      next();
    } else{
      res.json({
        status: '1',
        msg: '未登录',
        result: ''
      })
    }
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/phones',phones);
app.use('/earPhones',earPhones);
app.use('/cameras',cameras);
app.use('/wearTechs',wearTechs);
app.use('/noteBooks',noteBooks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
