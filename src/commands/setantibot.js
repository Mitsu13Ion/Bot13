const antibot = require("../data/antibot.json");
const fs = require("fs");

module.exports = class Setantibot extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "setantibot",
            description: "Activer/ désactiver l'anti-bot.",
            category: "Modération",
            aliases: "setab",
            usage: "setantibot [on/off]"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.GERANT_STAFF_ID)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0]) return this.missingArg(message);
        !antibot[message.guild.id] ? antibot[message.guild.id] = {status: false} : antibot[message.guild.id];
        switch (args[0].toLowerCase()) {
            case "on":
                if (antibot[message.guild.id].status === true) return message.channel.send(":x: L'anti-bot est déjà activé.");
                antibot[message.guild.id].status = true;
                message.channel.send("L'anti-bot est maintenant activé.");
            break;
            case "off":
                if (antibot[message.guild.id].status === false) return message.channel.send(":x: L'anti-bot est déjà désactivé.");
                antibot[message.guild.id].status = false;
                message.channel.send("L'anti-bot est maintenant désactivé.");
            break;
            default: return this.missingArg(message);
        };
        return fs.writeFile("./src/data/antibot.json", JSON.stringify(antibot), (err) => {
            if (err) console.log(err);
        });
    };
};