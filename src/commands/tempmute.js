const ms = require('ms');

module.exports = class Tempmute extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "tempmute",
            description: "Muter un utilisateur avec un temps définis.",
            category: "Modération",
            aliases: "tm",
            usage: "tempmute [durée] [utilisateur]"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.ACCES_BOT_PLUS) && !message.member.roles.has(bot.config.ACCES_BOT)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        if (!args[0] || !ms(args[0])) return this.missingArg(message);
        const getUser = message.guild.member(bot.function.fetchUsers(args.slice(1).join(" "), message));
        if (!getUser && args.slice(1).join(" ")) return message.channel.send(`:x: Utilisateur introuvable | Rééssayez avec le pseudo, l'ID, la mention ou le tag.`);
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
        if (getUser.roles.has(muterole.id)) return message.channel.send(`:x: Cet utilisateur est déjà mute !`);
        await getUser.addRole(muterole.id);
        message.channel.send(`**${getUser.user.username}** a été mute par **${message.author.username}** pendant *${args[0].toLowerCase()}* !`);
        setTimeout(async() => {
            if (!getUser.roles.has(muterole.id)) return;
            await getUser.removeRole(muterole.id);
            return message.channel.send(`:white_check_mark: **${getUser.user.username}** a été démute.`);
        }, ms(args[0]));
    };
};