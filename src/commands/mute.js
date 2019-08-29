module.exports = class Mute extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "mute",
            description: "Muter un utilisateur.",
            category: "Modération",
            usage: "mute [utilisateur] (raison)"
        });
    };

    async run(bot, message, args) {
        //if (!message.member.roles.has(bot.config.ACCES_BOT_PLUS) && !message.member.roles.has(bot.config.ACCES_BOT)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0]) return this.missingArg(message);
        const getUser = message.guild.member(bot.function.fetchUsers(args[0], message));
        if (!getUser && args.join(" ")) return message.channel.send(`:x: Utilisateur introuvable | Rééssayez avec le pseudo, l'ID, la mention ou le tag.`);
        if (getUser.hasPermission("MUTE_MEMBERS")) return message.channel.send(`:x: Cet utilisateur ne peut pas etre mute !`);
        let muterole = message.guild.roles.filter(r => r.name.toLowerCase().includes("mute")).first();
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({name: "muted", color: "#000000", permissions: []});
                await message.guild.channels.forEach(async channel => await channel.overwritePermissions(muterole, {SEND_MESSAGES: false, ADD_REACTIONS: false}));
            } catch (error) {
                console.log(error);
            };
        };
        var raison = args.slice(1).join(" ") ? ` : *${args.slice(1).join(" ")}*` : "";
        if (getUser.roles.has(muterole.id)) return message.channel.send(`:x: Cet utilisateur est déjà mute !`);
        await (getUser.addRole(muterole.id));
        return message.channel.send(`**${getUser.user.username}** a été mute par **${message.author.username}**${raison}!`);
    };
};