var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var {PythonShell} = require('python-shell');


var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');

var app = express();

// var options = {
//     mode: 'text',
//     encoding: 'utf8',
//     pythonOptions: ['-u'],
//     scriptPath: './routes/Crawler',
//     args: ['hello world'],
//     pythonPath: ''
//   };
  
//   var test = new PythonShell('Naver_Exhibition_crawler.py', options);
//   test.on('message',function(message){
//     console.log(message);
//   })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', searchRouter);

module.exports = app;
