exports.run = (client, message, args,  ops, active, discord) => {
  let fetched = ops.active.get(message.guild.id);
  if (!fetched) return message.channel.send("There aren't songs playing on this guild");
  let userCount = message.member.voiceChannel.members.size;
  let data = active.get(message.guild.id) || {};
  let required = Math.floor(userCount / 2);
  if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as me");
  if (message.member.id === data.queue[0].requester) {
      message.channel.send("Succesfully skipped the song");
      return fetched.dispatcher.emit('end');
  }else {

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`You already voted to skip the current song\n${fetched.queue[0].voteSkips.length}/${required} votes required`);
    fetched.queue[0].voteSkips.push(message.member.id);
    active.set(message.guild.id, fetched);
    if (fetched.queue[0].voteSkips.length >= required) {
      message.channel.send("Succesfully skipped the song");
      return fetched.dispatcher.emit('end');
    }
    message.channel.send(`${fetched.queue[0].voteSkips.length}/${required} votes to skip`);
  }

  /*let fetched = active.get(message.guild.id);

  if (!fetched) return message.channel.send("There aren't songs playing on this guild");

  if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as me");

  if (message.member.id !== data.queue[0].requester) {

    message.channel.send("You're not the requester");

    return;

  }

  if (message.member.id === data.queue[0].requester) {

    message.channel.send("Succesfully skipped the song");

    return fetched.dispatcher.emit('end');
  }*/
//  message.channel.send('The skip command is currently disabled');
}
