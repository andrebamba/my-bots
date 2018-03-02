// Load up the discord.js library
const Discord = require('discord.js');
var fs = require('fs');

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

// This is your bot. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `bot.something`, or `bot.something`,
// this is what we're refering to. Your bot.
const bot = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `bot.user` is what the
  // docs refer to as the "botUser".
  bot.user.setGame(`on ${bot.guilds.size} servers`);
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setGame(`on ${bot.guilds.size} servers`);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  bot.user.setGame(`on ${bot.guilds.size} servers`);
});


bot.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`P-P-PONG! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

bot.on('message', message => {
  if (message.content === 'fuck') {
     message.delete(1); //Supposed to delete message
      message.author.send("Please do not use swear words, and if you do again I will have to kick you.")
  }
});
bot.on('message', message => {
  if (message.content === 'shit') {
     message.delete(1); //Supposed to delete message
      message.author.send("Please do not use swear words, and if you do again I will have to kick you.")
  }
});
bot.on('message', message => {
  if (message.content === 'nigger') {
     message.delete(1); //Supposed to delete message
      message.author.send("Please do not use swear words, and if you do again I will have to kick you.")
  }
});
bot.on('message', message => {
  if (message.content === 'damn') {
     message.delete(1); //Supposed to delete message
      message.author.send("```Please do not use swear words, and if you do again I will have to kick you.```")
  }
});
bot.on('message', message => {
  if (message.content === 'bitch') {
     message.delete(1); //Supposed to delete message
      message.author.send("Please do not use swear words, and if you do again I will have to kick you.")
  }
});
bot.on('message', message => {
  if (message.content === 'nigga') {
     message.delete(1); //Supposed to delete message
      message.author.send("Please do not use swear words, and if you do again I will have to kick you.")
  }
});
bot.on('message', message => {
	
})

exports.run = (bot, message, args) => {
	let reason = args.slice(1).join(' ');
	let member = message.mentions.members.first();
	let modlog = message.guild.channels.find('name', 'mod-log');
	let muteRole = message.guild.roles.find('name', 'Muted');
	if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
	if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
	if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
	if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
	const embed = new Discord.RichEmbed()
	  .setColor(0x00AE86)
	  .setTimestamp()
	  .setDescription(`**Action:** Un/mute\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  
	if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions.').catch(console.error);
  
	if (member.roles.has(muteRole.id)) {
	  member.removeRole(muteRole).then(() => {
		bot.channels.get(modlog.id).send({embed}).catch(console.error);
	  })
	  .catch(e=>console.error("Cannot remove muted role: " + e));
	} else {
	  member.addRole(muteRole).then(() => {
		bot.channels.get(modlog.id).send({embed}).catch(console.error);
	  })
	  .catch(e=>console.error("Cannot add muted role: " + e));
	}
  
  };
  
  exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['unmute']
  };
  
  exports.help = {
	name: 'mute',
	description: 'mutes or unmutes a mentioned user',
	usage: 'un/mute [mention] [reason]'
  };

  bot.on('message', message => {
	// If the message is "ping"
	if (message.content === 'ping') {
	  // Send "pong" to the same channel
	  message.author.send('P-P-P-PONG!');
	}
  });
bot.on('guildMemberAdd', member => {
  console.log('User ' + member.username + ' has joined the server!')
  var role = member.guild.roles.find('name', 'Guest');
  member.addRole(role)
  member.guild.channels.get('419121767345553419').send('**' + member.user.username + '**, has joined the server!');
});
bot.on('guildMemberRemove', member => {
  member.guild.channels.get('419121767345553419').send('**' + member.user.username + '**, has left the server!');
});
bot.on('message', message => {
  var sender = message.author.id;
  if(!userData[sender.id]) userData[sender.id] = {
  messagesSent: 0
}
  userData[sender.id].messagesSent++;

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  })
  if(message.content === ',userstats') {
    message.channel.send('``You have sent **' + userData[sender.id].messagesSent + '** messages! Yay!``')
  }
});
bot.on('message', message => {
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let cont = message.content.slice()
})
bot.login(config.token);