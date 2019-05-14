const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const active = new Map();

client.on('ready', () => {
console.log(`${client.user.tag} is ready!`)
});

let ops = {
  active: active
}

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    if (message.channel.type == "dm") return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(`[INFO]: ${message.author.tag} executed ${command}`);
    try {
      let archivocomando = require(`./commands/${command}.js`);
      archivocomando.run(client, message, args,  ops, active, Discord);
    } catch (err) {
      console.log(err.message);
    }

  });

client.login(config.token);
