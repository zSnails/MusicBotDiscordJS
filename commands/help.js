const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args, discord) => {
 if (args[0] === 'other') {
   let otherEmbed = new Discord.RichEmbed()
   .setAuthor(message.author.username, message.author.avatarURL)
   .addField("✨ Other Commands", '`help`, `news`')
   .setColor(config.colour)
   message.channel.send(otherEmbed)
   return;
 }
 if (args[0] === 'music') {

   let musicEmbed = new Discord.RichEmbed()
   .setAuthor(message.author.username, message.author.avatarURL)
   .addField("🎧 Music Commands", "`join`, `play`, `queue`, `skip`, `volume`, `pause`, `resume`,`np`, `earrape`")
   .setColor(config.colour)
   message.channel.send(musicEmbed)
   return;
 }
 if (args[0] !== 'other' || 'music') {
   let noEmbed = new Discord.RichEmbed()
   .setAuthor(message.author.username, message.author.avatarURL)
   .addField("🎧 Music", '`help music`', true)
   .addField("✨ Other", '`help other`', true)
   .addField("🔗 Full command list", "See a full [command](https://gist.github.com/zSnails/c6430c18b1c6b3dd8daae7f5bb7817ea) list", true)
   .addField("📰 News", "See the latest [news](https://gist.github.com/zSnails/69683a8e9955d0a8e02c81014c5e7640) about me!")
   .setFooter('This bot is in early development, the sound may not be good at all')
   .setColor(config.colour)
   message.channel.send(noEmbed)
   return;
 }
}
