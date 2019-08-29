const Discord = require("discord.js");

module.exports = class Embed extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "embed",
            description: "Ecrire des messages dans un embed.",
            category: "Owner",
            usage: "embed [titre] (&& (message))",
        });
    };

    async run(bot, message, args) {
        if (!args[0]) return this.missingArg(message);
        var title = args.join(" ").split("&&")[0];
        var msg = args.join(" ").split("&&").slice(1).join("&&");
        await message.delete();
        const embed = new Discord.RichEmbed()
            .setColor("#000000")
        msg && title ? embed.setTitle(title).setDescription(msg) : embed.setDescription(title)
        return message.channel.send(embed);
    };
};