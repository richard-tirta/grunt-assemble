var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/dist/'));

var server = app.listen(port, function(){
	var host = server.address().address
  	var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
});