var express = require('express');
var http = require('http');

var app = express();

var server = http.createServer(app);
server.listen(process.env.PORT || 5000);