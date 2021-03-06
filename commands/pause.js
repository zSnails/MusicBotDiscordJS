exports.run = (client, message, args,  ops, active, discord) => {
  let data = active.get(message.guild.id) || {};
  let fetched = active.get(message.guild.id);
  if (!fetched) return message.channel.send("There's no music playing rn");
  if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as the bot");

  if (message.member.id !== data.queue[0].requester) {

    message.channel.send("You're not the requester");

    return;

  }
  if (fetched.dispatcher.paused) return message.channel.send("The song has already been paused");
  fetched.dispatcher.pause();

  message.channel.send("Successfully paused the song");

}
