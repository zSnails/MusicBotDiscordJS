const Discord = require('discord.js');
//Ik that I already passed Discord but I'm just too lazy to fix anything on this bot lmfbao
const config = require('../config.json');
exports.run = async (client, message, args,  ops, active, discord) => {
  let fetched = active.get(message.guild.id);
  if (!fetched) return message.channel.send("There's no music playing rn");
  let queue = fetched.queue;
  let nowPlaying = queue[0];
  let resp = `${nowPlaying.songTitle}, requested by: <@${nowPlaying.requester}>\n**---**\n`

  for (var i = 1; i < queue.length; i++) {
    resp += `${i}. ${queue[i].songTitle}, requested by: <@${queue[i].requester}>\n`
  }
  let embed = new Discord.RichEmbed()
  //.setDescription(resp)
  .addField('Now Playing', resp)
  .setColor(config.colour)
message.channel.send(embed)


}
