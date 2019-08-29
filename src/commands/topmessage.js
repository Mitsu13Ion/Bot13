const {RichEmbed} = require("discord.js");
const messages = require("../data/messages");

module.exports = class TopMessage extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "topmessage",
            description: "Affiche le top 20 des utilisateurs les plus actifs.",
            category: "Information",
            aliases: "topmsg",
            usage: "topmessage"
        });
    };

    async run(bot, message, args) {
        const embed = new RichEmbed()
            .setTitle("Top 20 des utilisateurs les plus actifs")
            .setDescription(Object.entries(userData).sort((a, b) => b[1].messageSent - a[1].messageSent).slice(0, 20).map(e => `**${bot.users.get(e[0]) ? bot.users.get(e[0]).tag : "Utilisateur introuvable"}**\nMessages envoyés: ${e[1].messageSent}`).join("\n"))
            .setColor("#000000")
            .setFooter(`Demandé par ${message.author.tag}`, message.author.displayAvatarURL)
        return message.channel.send(embed);
    };
};