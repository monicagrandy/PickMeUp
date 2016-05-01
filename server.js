//image server, serves static files
var express = require('express');
var app = express();
var bodyParser = require('body-parser').json()
var morgan = require('morgan');
var cors = require('cors');
var controller = require('./server/controller.js')
var port = 8080;
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/client/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.post('/apiAddress', bodyParser, controller.getAddress);
app.post('/apiPlaces', bodyParser, controller.getPlaces)

app.listen(port);
console.log("Express server listening on %d in %s mode", port, app.settings.env);