const express = require('express')
const bodyParser = require('body-parser')
var exec = require('child_process').exec;

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
const servicesAPI = require("./constants/servicesAPI.js");
const messages = require("./constants/messages.js");
const config = require("./constants/config.js");


const app = express()
app.use( bodyParser.json() );



app.all('/test', function (req, res) {
	//data = [{key:"text=",value:"Resposta automatica"},{key:"chat_id=",value:373552498}]
	//telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);
	console.log(req.body);
	
	photos = req.body.message.photo
	photo = photos[photos.length-1]
	photo.file_id
  	res.send('Ok')
})

app.all('/rest', function (req, res) {
	
	//debug
	console.log(req.body);
	
	//Verifica se e imagem
	if(req.body.message.photo != undefined){

		//Coleta dados da imagem
		photos = req.body.message.photo
		index = (photos.length ==4)? 3:photos.length-1
		photo = photos[index]

		//Responde usuario
		data = [{key:"text=",value: messages.received_image.replace("{name}", req.body.message.from.first_name)},{key:"chat_id=",value:req.body.message.chat.id}]
		telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);

		//Faz download da imagem
		data_file = [{key:"file_id=",value:photo.file_id}]
		telegramAPI.consumeAPI(servicesAPI.getFile,data_file,function(result){
			telegramAPI.downloadImage(result.data.result.file_path,"./"+result.data.result.file_path, function(path){
				console.log("BAIXOU A IMAGEM"+path);
				
				var cmd = 'ls '+path;
				exec(cmd, function(error, stdout, stderr) {
  					// command output is in stdout
  					console.log(stdout)
				});
			});		
		});
		
	} //Chat
	else{

		if(req.body.message.text == "beleza" || req.body.message.text == "Beleza")
			data = [{key:"text=",value:messages.blz},{key:"chat_id=",value:req.body.message.chat.id}]
		else
			data = [{key:"text=",value:messages.hello.replace("{name}",req.body.message.from.first_name)},{key:"chat_id=",value:req.body.message.chat.id}]
		
		telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);
	}
	
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