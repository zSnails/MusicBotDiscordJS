exports.run = (client, message, args,  ops, active, discord) => {
  let data = active.get(message.guild.id) || {};
  let fetched = active.get(message.guild.id);
  if (!fetched) return message.channel.send("There aren't songs playing on this guild");
  if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as me");
  if (message.member.id !== data.queue[0].requester) {
    message.channel.send("You're not the requester");
    return;
  }
  if (message.member.id === data.queue[0].requester) {
    message.channel.send("Succesfully stopped the song");
    return fetched.dispatcher.emit('end');
  }
}
