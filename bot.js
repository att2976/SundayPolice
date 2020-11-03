const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!')
})

// Days are represented by their index, Sunday = 0, Saturday = 6.
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];

/*
This event fires whenever anyone leaves or joins a channel.
The date code has to be inside of it to work, if it was outside
it would be considered a global variable.
oldMember is the channel being left, newMember is the channel being entered.
*/
client.on('voiceStateUpdate', (oldMember, newMember) => {
	// Empty params sets it to the current time
	var today = new Date();

	// This sets the offset to UTC-4, Eastern Daylight Time. Will be -5 during Eastern Standard Time
	today.setHours(today.getHours() + today.getTimezoneOffset()/60 - 5);
	var day = today.getDay();

	console.log(today.toString());
	console.log("Today is : " + daylist[day] + ".");

	/* 
	First checks if someone is trying to connect to the Sunday Channel.
	This compares the newMember ChannelID and the sunday channel ID specified in the config
	If they are, check if it is sunday.
	If it is sunday, do nothing. 
	If not, move the user to the destination channel specified in the config
	*/
	let newChannel = newMember.voiceChannelID;
	if(newChannel == config.SunChan && daylist[day] != "Sunday"){
		newMember.setVoiceChannel(config.Dest);
	}
	else {}
});

//Used in place of secret bot key to run on Heroku
client.login(process.env.BOT_TOKEN);
