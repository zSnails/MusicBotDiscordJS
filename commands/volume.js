exports.run = (client, message, args, ops, discord, active) => {
let data = ops.active.get(message.guild.id) || {};
let fetched = ops.active.get(message.guild.id);
if (!fetched) return message.channel.send('There aren\'t any songs playing on this guild');

if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as the bot");
if (message.member.id !== data.queue[0].requester) {

  message.channel.send("You're not the requester");

  return;

}
if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send("Please provide a number between 0 & 200");

fetched.dispatcher.setVolume(args[0]/100);

message.channel.send("Volume set to: " + args[0])

}
