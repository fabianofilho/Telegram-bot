/*
	Bot Pé Diabético
*/
var exec = require('child_process').exec;

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
var servicesAPI = require("./constants/servicesAPI.js");
const config = require("./constants/config.js");

data = [{key:"text=",value:"TESTE"},{key:"chat_id=",value:373552498}]

data_file = [{key:"file_id=",value:"AgADAQADr6cxG_zhqEamjCNpNglZdc0v9y8ABGdMqw1Hb2tOX0IAAgI"}]

//telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);


function test2(result){
	telegramAPI.downloadImage(result.data.result,config.download_path+result.data.result.file_id+".jpg", function(result){
				console.log("BAIXOU A IMAGEM"+result.path);
				
				var cmd = "cd {caffe_path} ; python {caffe_script}{id_image}.png"
				cmd = cmd.replace("{caffe_path}",config.caffe_path)
						.replace("{caffe_script}",
							config.caffe_script.replace("{path_in}",config.reverse_path+result.path)
										.replace("{path_out}",config.reverse_path+config.processed_path))
						.replace("{id_image}",result.image_id)

				exec(cmd, function(error, stdout, stderr) {
  					// command output is in stdout
  					console.log(stderr)
  					console.log(stdout)
				});
			});		
}

function test(a){	
	telegramAPI.downloadImage(a.data.result.file_path,"./photos/"+a.data.result.file_id+".jpg",function(a){
		console.log(a);
	});
}

//telegramAPI.consumeAPI(servicesAPI.getFile,data_file,test);

telegramAPI.consumeAPI(servicesAPI.getFile,data_file,test2);
//telegramAPI.consumeAPI(servicesAPI.getUpdates,null,interface.show);