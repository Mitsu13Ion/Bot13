module.exports = class Ban extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "ban",
            description: "Bannir un utilisateur.",
            category: "Modération",
            usage: "ban [utilisateur] (raison)"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.ACCES_BOT_PLUS)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0]) return this.missingArg(message);
        const getUser = message.guild.member(bot.function.fetchUsers(args[0], message));
        if (!getUser && args.join(" ")) return message.channel.send(`:x: Utilisateur introuvable | Rééssayez avec le pseudo, l'ID, la mention ou le tag.`);
        if (!getUser.bannable) return message.channel.send(`:x: Cet utilisateur ne peut pas être bannis.`);
        if (message.member.highestRole.calculatedPosition <= getUser.highestRole.calculatedPosition) return message.channel.send(`:x: Vous ne pouvez pas bannir cet utilisateur.`);
        let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : `(Bannis par ${message.author.tag})`;
        message.guild.member(getUser).ban(reason);
        return message.channel.send(`**${getUser.user.username}** a été bannis par **${message.author.username}** ! Raison : *${reason}*`);
    };
};