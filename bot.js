const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!')
})


  var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  // console.log("Today is : " + daylist[day] + ".");

client.on('voiceStateUpdate', (oldMember, newMember) => {
	var today = new Date();
	today.setHours(today.getHours() + today.getTimezoneOffset()/60 - 4);
	var day = today.getDay();
	console.log(today.toString());
	console.log("Today is : " + daylist[day] + ".");
	let newChannel = newMember.voiceChannelID;
	if(newChannel == config.SunChan && daylist[day] != "Sunday"){
		newMember.setVoiceChannel(config.Dest);
	}
	else {}
});

client.login(process.env.BOT_TOKEN);
