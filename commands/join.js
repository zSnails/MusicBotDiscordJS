exports.run = (client, message, args,  ops, active, discord) => {
    let data = active.get(message.guild.id) || {};
if (message.guild.me.voiceChannel) return message.channel.send('I\'m already on a vc');
if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel to use this command');
if (message.member.voiceChannel) {
  message.member.voiceChannel.join();
  message.channel.send('Succesfully connected to your voice channel.');
};
}
