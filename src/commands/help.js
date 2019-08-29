const {RichEmbed} = require("discord.js");

module.exports = class Help extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "help",
            description: "Afficher la page d'aide.",
            category: "Information",
            aliases: "h",
            usage: "help"
        });
    };

    async run(bot, message, args) {
        const helpEmbed = new RichEmbed()
            .setAuthor(`Commande du bot ${bot.user.username}`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setFooter(`Demandé par ${message.author.tag}`, message.author.displayAvatarURL)
            .setColor("#000000")
            bot.commands.forEach(async c => {
                await helpEmbed.addField(c.description, bot.config.PREFIX + c.usage);
            });
        return message.channel.send(helpEmbed);
    };
};