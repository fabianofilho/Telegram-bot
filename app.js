/*
	Bot Pé Diabético
*/

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
var servicesAPI = require("./constants/servicesAPI.js");

data = [{key:"text=",value:"TESTE"},{key:"chat_id=",value:373552498}]

data_file = [{key:"file_id=",value:"AgADAQADr6cxG_zhqEamjCNpNglZdc0v9y8ABGdMqw1Hb2tOX0IAAgI"}]

//telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);


function test(a){	
	telegramAPI.downloadImage(a.data.result.file_path,"./"+a.data.result.file_path);
}

telegramAPI.consumeAPI(servicesAPI.getFile,data_file,test);

//telegramAPI.consumeAPI(servicesAPI.getUpdates,null,interface.show);