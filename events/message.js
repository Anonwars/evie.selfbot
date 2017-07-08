/*global wait*/
const warned = [];

module.exports = async (client, message) => {
  if(message.isMentioned(client.user.id) || message.mentions.everyone || (message.guild && message.mentions.roles.filter(r=>message.guild.member(client.user.id).roles.has(r.id)).size > 0)) {
  client.log("mention", `${message.guild.name} #${message.channel.name}`, message.author, message.content);
  }

  if(message.author.id !== client.user.id) return;
  if(message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(client.config.prefix.length).toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (cmd) {
    message.flags = [];
    while(args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    cmd.run(client, message, args);
  } else if(client.tags.has(command)) {
    message.edit(`${args.join(" ")} ${client.tags.get(command)}`);
  }
};
