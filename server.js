var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) { res.send('OK'); });

app = require('./routes/...')(app);

var server = app.listen(1337, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});