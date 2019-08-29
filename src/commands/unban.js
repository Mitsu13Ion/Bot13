const Discord = require("discord.js");

module.exports = class Unban extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "unban",
            description: "Debannir un utilisateur.",
            category: "ModÃ©ration",
            usage: "unban [utilisateur]"
        });
    };

    async run(bot, message, args) {
        if (!message.member.roles.has(bot.config.ACCES_BOT_PLUS)) return message.channel.send(`:x: Vous n'avez pas la permissions d'utiliser cette commande !`);
        let search = args.join(" ");
        if (!args[0]) return message.channel.send(`:x: Mauvaise utilisation | unban [utilisateur]`);
        if( !search) return message.channel.send(`:x: Utilisateur introuvable | RÃ©Ã©ssayez avec le pseudo, l'ID, la mention ou le tag.`);
        try {
            let bans = await message.guild.fetchBans();
            let banned = bans.get(search) || bans.find(u => u.tag.toLowerCase().includes(search.toLowerCase()));
            if(!banned) return message.channel.send(`:x: Utilisateur introuvable | RÃ©Ã©ssayez avec le pseudo, l'ID, la mention ou le tag.`);
            const modlogs = new Discord.RichEmbed()
                .setAuthor("Unban")
                .addField("Membre :busts_in_silhouette:",banned.tag)
                .addField(`:white_check_mark: | Unban du serveur ${message.guild.name}`, `**Unban par :** ${message.author.tag}`)
                .setColor("#000000")
            var generalChannel = bot.channels.get("615828560460120075")
            generalChannel.send(modlogs)
            await message.guild.unban(banned);
            message.channel.send(`:white_check_mark: ${banned.tag} a bien ete unban !`);
        } catch(e) {
            message.channel.send(`:x: L'unban n'a pas pu etre effectue : ${reason}`);
        };
    };  
};