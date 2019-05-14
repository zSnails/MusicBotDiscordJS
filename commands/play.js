const Discord = require('discord.js');
const search = require('yt-search');
const config = require('../config.json');
exports.run = async(client, message, args, ops) => {
  if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel to use this command');
  if (message.member.voiceChannel) await message.member.voiceChannel.join();
  if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as the bot");
  if (!args[0]) return message.channel.send('Please provide a keyword with the command');
  search(args.join(' '), function(err, res) {
    if (err) return message.channel.send("Song not found");
    let videos = res.videos.slice(0, 10);
    let resp = '';
    for (var i in videos) {
      resp += `${parseInt(i)+1}: ${videos[i].title}\n`
    }
    let embed = new Discord.RichEmbed()
    .addField('Choose a number between 1 & 10 (You have 25 secs)', resp)
    .setColor(config.colour)
    message.channel.send(embed)
    .then(msg => {
      setTimeout(function(){
        let editebed = new Discord.RichEmbed()
        .setAuthor("This request is unavailable")
        .setDescription("For more information run the `bx.help` command")
        .setColor(config.colour)
        msg.edit(editebed)
      }, 1000 * 25)

    })
    const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;

    const collector = message.channel.createMessageCollector(filter, {
       time: 25000
    });



    collector.videos = videos;
    collector.once('collect', function(m) {
      let commandFile = require(`./6534.js`);
      commandFile.run(client, message, [this.videos[parseInt(m.content) - 1].url], ops)
    });
  });
}
