//image server, serves static files
var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors');
var port = process.env.PORT || 8080;
app.use(morgan('tiny'));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/client/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.get('/', function(req,res){
  res.render('index');
})

app.listen(port);
console.log("Express server listening on %d in %s mode", port, app.settings.env);


