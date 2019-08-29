const messages = require("../data/messages");
const fs = require("fs");

module.exports = class Message extends require("../structures/Event") {
    constructor(args) {
        super(args, {
            name: "message"
        });
    };

    run(bot, message) {
        if (message.author.bot || message.channel.type === "dm" || !message.channel.permissionsFor(bot.user.id).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        !messages[message.author.id] ? message[message.author.id] = {messageSent: 0} : message[message.author.id];
        if (message.channel.parentID !== "614934691379937301") messages[message.author.id].messageSent++;
        fs.writeFile("./src/data/messages.json", JSON.stringify(messages), (err) => {
            if (err) console.log(err);
        });
        const usedPrefix = new RegExp(`^(${bot.config.PREFIX.split("").map(p => `\\${p}`).join("")}|<@!?${bot.user.id}>\ |${bot.user.username.toLowerCase()}\ )`).exec(message.content.toLowerCase());
        if (!usedPrefix) return;
        const args = message.content.slice(usedPrefix[0].length).split(/\s+/g);
        const commandSearch = args.shift();
        if (!commandSearch) return;
        const cmd = bot.commands.get(commandSearch.trim().toLowerCase()) || bot.aliases.get(commandSearch.trim().toLowerCase());
        if (!cmd) return;
        if (cmd.category === "Owner" && message.author.id !== bot.config.OWNER_ID) return message.channel.send(":x: Vous ne pouvez pas utiliser ces commandes.");
        return cmd.run(bot, message, args);
    };
};