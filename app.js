/*
	Bot Pé Diabético
*/
var exec = require('child_process').exec;

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
var servicesAPI = require("./constants/servicesAPI.js");
var responseControl = require("./libs/responseControl.js"); 
const config = require("./constants/config.js");

data = [{key:"text=",value:"TESTE"},{key:"chat_id=",value:373552498}]

data_file = [{key:"file_id=",value:"AgADAQADr6cxG_zhqEamjCNpNglZdc0v9y8ABGdMqw1Hb2tOX0IAAgI"}]

//telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);



function test2(result){
chat_id = 373552498;
	telegramAPI.downloadImage(result.data.result,config.download_path+result.data.result.file_id+".jpg", function(result){
				console.log("BAIXOU A IMAGEM"+result.path);
				
				var cmd = "cd {caffe_path} ; echo {caffe_script}{id_image}.png"
				cmd = cmd.replace("{caffe_path}",config.caffe_path)
						.replace("{caffe_script}",
							config.caffe_script.replace("{path_in}",config.reverse_path+result.path)
										.replace("{path_out}",config.reverse_path+config.processed_path))
						.replace("{id_image}",result.image_id)

				exec(cmd, function(error, stdout, stderr) {
  					// command output is in stdout
  					if(error == null){
  						//responseControl.responseImages(config.processed_path,telegramAPI.uploadImage);
  						//responseControl.sendImage(chat_id,config.processed_path+result.image_id+".png",telegramAPI.uploadImage);
  						data_file = {path_img:config.processed_path+result.image_id+".png",chat_id:chat_id}
  						telegramAPI.uploadImage(data_file,function(result){
  							console.log(chat_id)
  							console.log(result)
  						});
  					}
  					else{
  						console.log("ERRO AO PROCESSAR IMAGEM");
  						console.log(stderr)
  					}
  					//console.log(stderr)
  					//console.log(stdout)
				});
			});		
}

function test(a){	
	telegramAPI.downloadImage(a.data.result.file_path,"./photos/"+a.data.result.file_id+".jpg",function(a){
		console.log(a);
	});
}

//telegramAPI.consumeAPI(servicesAPI.getFile,data_file,test);
responseControl.file_queue.push({chat_id:373552498,image_id:"AgADAQADr6cxG_zhqEamjCNpNglZdc0v9y8ABGdMqw1Hb2tOX0IAAgI"})
telegramAPI.consumeAPI(servicesAPI.getFile,data_file,test2);
//telegramAPI.consumeAPI(servicesAPI.getUpdates,null,interface.show);