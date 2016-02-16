//image server, serves static files
var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors');
var port = 8080;
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/client/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.listen(port);
console.log("Express server listening on %d in %s mode", port, app.settings.env);


