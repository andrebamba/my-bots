
const Discord = require('discord.js');
const client = new Discord.Client();
const { Client } = require('discord.js');
const bot = new Client();
const cfg = ('./config.json');
const token = 'NDE4NjA3NzA3MTM4ODE4MDQ5.DXkOMw.BH5_3UgkAIsH0x-iWuMod1oaBMU';

client.login(token);
client.on('ready', () => {
  console.log('TroyeBot loaded!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === 'whats my avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});
client.on('message', message => {
    // If the message is "ping"
    if (message.content === 'thanks') {
      // Send "pong" to the same channel
      message.reply('It was a honor!');
    }
  });
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'suh') {
    // Send "pong" to the same channel
    message.reply('suh dude');
    }
  });

  bot
    .on('guildCreate', console.log)
    .on('guildDelete', console.log);
client.on('message', message => {
  if (message.content === '!info') {
    message.reply('This is an experimental bot, just in the makings. Wait while I create more commands.');
  }
});
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'hi') {
    // Send "pong" to the same channel
    message.channel.send('Hello!');
  }
});
