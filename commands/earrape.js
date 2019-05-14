exports.run = (client, message, args, ops, discord, active) => {
    let data = ops.active.get(message.guild.id) || {};
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('There aren\'t any songs playing on this guild');
    
    if (message.member.voiceChannelID !== message.guild.me.voiceChannelID) return message.channel.send("You're not in the same channel as the bot");
    if (message.member.id !== data.queue[0].requester) {
    
      message.channel.send("You're not the requester");
    
      return;
    
    }
    
    fetched.dispatcher.setVolume(500/100);
    
    message.channel.send("Earrape enabled, to turn it off just change the volume lol I didn't had enough time to make a toggle lmfao.")
    
    }
    