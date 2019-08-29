const ms = require("ms");

module.exports = class Bingo extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "bingo",
            description: "Lancer un bingo.",
            category: "Animation",
            usage: "bingo [nombre maximun] [durée]"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.ANIMATION_ID)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0]) return this.missingArg(message);
        if (isNaN(args[0])) return message.channel.send(`:x: **${args[0]}** n'est pas un nombre valide.`);
        if (!ms(args[1])) return message.channel.send(":x: Vous devez indiquer un temps valide | 1h, 1m, 1s...");
        await message.delete();
        return message.channel.send(`Le bingo commence ! Trouvez le nombre entre 0 et ${Math.abs(Math.round(args[0]))}`).then(async m => {
            const random = Math.floor(Math.random() * Math.abs(args[0]));
            const collector = await m.channel.createMessageCollector(m => !m.author.bot, {time: ms(args[1])});
            collector.on("collect", async collected => {
                let response = parseInt(collected.content.trim());
                if (isNaN(response)) return;
                if (response === random) await collector.stop(`:trophy: **${collected.author.username}** a remporté le bingo, le nombre était **${random}**.`);
            });
            return collector.on("end", async(collected, reason) => {
                if (reason && reason !== "time") return message.channel.send(reason);
                return message.channel.send(`Personne a remporté le bingo, le nombre était **${random}**.`);
            });
        });
    };
};