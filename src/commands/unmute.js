module.exports = class Unmute extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "unmute",
            description: "Démuter un utilisateur.",
            category: "Modération",
            aliases: "um",
            usage: "unmute [utilisateur]"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.ACCES_BOT_PLUS) && !message.member.roles.has(bot.config.ACCES_BOT)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0]) return this.missingArg(message);
        const getUser = message.guild.member(bot.function.fetchUsers(args.join(" "), message));
        if (!getUser && args.join(" ")) return message.channel.send(`:x: Utilisateur introuvable | Rééssayez avec le pseudo, l'ID, la mention ou le tag.`);
        let muterole = message.guild.roles.filter(r => r.name.toLowerCase().includes("mute")).first();
        if (!muterole || !getUser.roles.has(muterole.id)) return message.channel.send(`:x: Cet utilisateur n'est pas mute !`);
        await getUser.removeRole(muterole.id);
        return message.channel.send(`**${getUser.user.username}** a été démute par **${message.author.username}** !`);
    };
};