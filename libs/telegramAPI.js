/*
* Rudimentar consuming Telegram API Bot
* 04/10/2017 - (C) João Carlos Pandolfi Santana
* joaopandolfi@gmail.com
*/

var apiKey = "bot450624598:AAFKGY8CqIReycn7rQGBso8rE3LzztLQsMM";
var baseUrl = "https://api.telegram.org/{api}/{service}";
var imageUrl = "https://api.telegram.org/file/{api}/{file}"

/*
	Get url base with Service
*/
function getBaseUrl(service){
	return baseUrl.replace("{api}",apiKey).replace("{service}", service);
}

function getImageUrl(imageId){
	return imageUrl.replace("{api}",apiKey).replace("{file}", imageId);
}


function downloadImage(image_data,path,callback){
	var https = require("https");
	Stream = require('stream').Transform,                                  
    fs = require('fs');

	callUrl = getImageUrl(image_data.file_path);
	https.request(callUrl, function(response) {                                        
	 var data = new Stream();                                                    

	  response.on('data', function(chunk) {                                       
	    data.push(chunk);                                                         
	  });                                                                         

	  response.on('end', function() {                                             
	    fs.writeFileSync(path, data.read());
	    callback({image_id:image_data.file_id,path:path});                               
	  });                                                                         
	}).end();
}

/*
data =  [{key:"text=",value:"TESTE"},{key:"chat_id=",value:373552498}]
*/
function consumeAPI(service,r_data,callback){
	var https = require("https");
	var data = "";

	callUrl = getBaseUrl(service);
	
	if(r_data != null){
		callUrl+="?";
		for(var i = 0; i < r_data.length ; i++){
			 callUrl += r_data[i].key + r_data[i].value+"&";
		}
		
	}
	callUrl = encodeURI(callUrl);

	console.log(callUrl);

	https.get(callUrl, function(res) {
  		
  		console.log("Got response: " + res.statusCode);
  		
  		if(res.statusCode == 404)
  			callback({success:0,error:404,data:{}});

   		res.setEncoding('utf8');

  		res.on('data', function (chunk) {
	   		data += chunk;
  		});

	  	res.on('end', function(e){

	  		console.log("DEBUG: "+data);

			parsed = JSON.parse(data);
			callback({success:1,error:0,data:parsed});
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}


/*
upload Image
*/
function uploadImage(data,callback){
	
	console.log("UPANDO IMAGEM: "+data.path_img)
	//var request = require('request');
	//var FormData = require('form-data');
	var baseUrl = getBaseUrl("sendPhoto")
	var request = require('superagent');
	var agent1 = request.agent();
	agent1.post(baseUrl)
      .attach('photo',data.path_img)
      .attach('chat_id',data.chat_id)
      .end(function(err, res) {
          if (err) {
              console.log("ERRO:" +err)
           }
           //console.log(res.body)
           callback(res.body)
       });
}

module.exports = {consumeAPI: consumeAPI, downloadImage: downloadImage, uploadImage:uploadImage}

//consumeAPI(services.getMe,function(a){console.log(a)});