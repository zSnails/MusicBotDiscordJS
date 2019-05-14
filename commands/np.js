const config = require('../config.json');
const Discord = require('discord.js');
exports.run = (client, message, args,  ops, active, discord) => {
  let fetched = active.get(message.guild.id);
  if (!fetched) return message.channel.send("There's no music playing rn");
  let queue = fetched.queue;
  let nowPlaying = queue[0];
  let resp = `${nowPlaying.songTitle}, requested by: <@${nowPlaying.requester}>` 
  let embed = new Discord.RichEmbed()
  .addField('Now Playing', resp)
  .setColor(config.colour)
  message.channel.send(embed)
}
