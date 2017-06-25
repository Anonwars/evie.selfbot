exports.run = (client, msg, args) => {

  if(!args[0].startsWith("-")) {
    const [name, ...message] = args;
    if(!client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -help\` for help.`, {deleteAfter:true});
    const tag = client.tags.get(name);
    console.log(tag);
    return client.answer(msg, `${message.join(" ")}${tag}`);
  }
  
  const action = args[0].slice(1);
  const [name, ...extra] = args.slice(1);
  
  switch(action) {
    case ("add") :
      if(client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` already exist.`, {deleteAfter:true});
      client.tags.set(name, extra.join(" "));
      client.answer(msg, `The new tag \`${name}\` was added to the database.`, {deleteAfter:true});
      break;
    case ("del") :
      if(!client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -list\``, {deleteAfter:true});
      client.tags.delete(name);
      client.answer(msg, `The tag \`${name}\` has been deleted`, {deleteAfter:true});
      break;
    case ("edit") :
      if(!client.tags.has(name)) return client.answer(msg, `The tag \`${name}\` does not exist. Use \`${client.config.prefix}tags -list\``, {deleteAfter:true});
      const tag = client.tags.get(name);
      tag.contents = extra;
      client.tags.set(name, tag);
      break;
    case ("list") :
      const options = (extra[0] === "del" ? {deleteAfter: true, delay: 10000} : {deleteAfter : false});
      client.answer(msg, "```\n" + client.tags.map((s,k) =>k).join(", ") + "\n```", options);
      break;
    case ("help") :
    default:
      const optionsHelp = (extra[0] === "del" ? {deleteAfter: true, delay: 5000} : {deleteAfter : false});
      let message = `\`\`\`xl
-add newTagName This is your new tag contents
-del tagName
-edit existingtagName This is new new edited contents
-list

Yeah yeah I'll make this a fancy embed, one day.
\`\`\`
\`This message will self-destruct in 5 seconds\``;
      client.answer(msg, message, optionsHelp);
      break;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Show or modify tags.',
  usage: 'tag <action> [tagname] <contents> (use -help action to show additional help)'
};