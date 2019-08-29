module.exports = class Kick extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "kick",
            description: "Explusez un utilisateur.",
            category: "Modération",
            usage: "kick [utilisateur] (raison)"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.ACCES_BOT_PLUS)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0]) return this.missingArg(message);
        const getUser = message.guild.member(bot.function.fetchUsers(args[0], message));
        if (!getUser && args.join(" ")) return message.channel.send(`:x: Utilisateur introuvable | Rééssayez avec le pseudo, l'ID, la mention ou le tag.`);
        if (!getUser.kickable) return message.channel.send(`:x: Cet utilisateur ne peut pas être expulsé.`);
        if (message.member.highestRole.calculatedPosition <= getUser.highestRole.calculatedPosition) return message.channel.send(`:x: Vous ne pouvez pas expulser cet utilisateur.`);
        let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : `(Expulsé par ${message.author.tag})`;
        message.guild.member(getUser).kick(reason);
        return message.channel.send(`**${getUser.user.username}** a été expulsé par **${message.author.username}** ! Raison : *${reason}*`);
    };
};