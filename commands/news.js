const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {
let embed = new Discord.RichEmbed()
.setAuthor("📰 News")
.setDescription("See the latest [news](https://gist.github.com/zSnails/69683a8e9955d0a8e02c81014c5e7640) about me!")
.setColor(config.colour)
message.channel.send(embed)
}
