const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
var servicesAPI = require("./constants/servicesAPI.js");

app.use( bodyParser.json() );

app.all('/rest', function (req, res) {
	data = [{key:"text=",value:"Resposta automatica"},{key:"chat_id=",value:373552498}]
	telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);
	console.log(req.body);
  	res.send('Ok')
})

app.all('/test', function (req, res) {
	console.log(req.body);
	if(req.body.message.text == "beleza" || req.body.message.text == "Beleza"){
		data = [{key:"text=",value:"Então é nois mano"},{key:"chat_id=",value:req.body.message.chat.id}]
	}
	else
		data = [{key:"text=",value:"Fala "+req.body.message.from.first_name+" Beleza?"},{key:"chat_id=",value:req.body.message.chat.id}]
	telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);
	console.log("ok")
  	res.send('Ok')
})

app.all('/test2', function (req, res) {
	console.log(req.body);
  	res.send('Ok')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})