/*
This is the main play command, this shouln'd be like it is but idc, it's up to you to fix this crappy bot lmfao
as always, don't touch anything here
I'll mark things that are safe to touch

*/



const ytdl = require('ytdl-core');
const Discord = require('discord.js');
exports.run = async (client, message, args,  ops, active, discord) => {
  let data = ops.active.get(message.guild.id) || {};
  let info = await ytdl.getInfo(args[0]);
  if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel');
  if (!args[0]) return message.channel.send('Please provide a keyword or an url');
  let validate = await ytdl.validateURL(args[0]);
  if (!validate) {
    let commandFile = require(`./search.js`);
    return commandFile.run = (client, message, args, ops);
  }
  if (!data.connection) data.connection = await message.member.voiceChannel.join();
  if (!data.queue) data.queue = [];
  data.guildID = message.guild.id;
  data.queue.push({
    songTitle: info.title,
    requester: message.author.id,
    url: info.video_url,
    announceChannel: message.channel.id,
    thumbnail: info.iurlmq,
    views: info.short_view_count_text,
    author: info.author,
    id: info.id
  });
  if (!data.dispatcher) play(client, ops, data);
  else {
    // ======= Safe =======
    let embede = new Discord.RichEmbed()
    .setAuthor("Added to queue")
    .setTitle(`${info.title}`)
    .setURL(info.video_url)
    .setThumbnail(info.iurlmq)
    .addField(`Requested by`, `${message.author.tag}`)
    .setColor('#592a16')
    message.channel.send(embede)
    // ====== unsafe ======
  }

  ops.active.set(message.guild.id, data);

}
async function play(client, ops, data) {
  // ======= safe =======
  let nembed = new Discord.RichEmbed()
  .setAuthor("Now Playing")
  .setTitle(`${data.queue[0].songTitle}`)
  .setURL(data.queue[0].url)
  .setThumbnail(data.queue[0].thumbnail)
  .addField('Requested by', `<@${data.queue[0].requester}>`)
  .setColor('#592a16')
  // ====== unsafe ======
  client.channels.get(data.queue[0].announceChannel).send(nembed)
  data.dispatcher = await data.connection.playStream(await ytdl(data.queue[0].url, {
    filter: 'audio',
    bitrate: '1900kbps',
    quality: 'highestaudio',
    type: 'opus'
  }));
  data.dispatcher.guildID = data.guildID;
  data.dispatcher.once('end', function() {
    finish(client, ops, this);
  });
}

function finish(client, ops, dispatcher) {
  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();
  if (fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);

    play(client, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildID);
    let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
    if (vc) vc.leave()
  }
}
