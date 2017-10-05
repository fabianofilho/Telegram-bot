/*
	Bot Pé Diabético
*/

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
var servicesAPI = require("./constants/servicesAPI.js");

data = [{key:"url=",value:"https://b17db016.ngrok.io/test?"}]


telegramAPI.consumeAPI(servicesAPI.setWebhook,data,interface.show);
