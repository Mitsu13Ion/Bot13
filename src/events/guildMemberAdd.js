const antibot = require("../data/antibot");

module.exports = class GuildMemberAdd extends require("../structures/Event") {
    constructor(args) {
        super(args, {
            name: "guildMemberAdd"
        });
    };

    async run(bot, member) {
        if (member.guild.id !== bot.config.PARTAGE_ID) return;
        if (antibot[member.guild.id] && antibot[member.guild.id].status && member.user.bot) {
            if (member.bannable) {
                member.ban(`Les bots sont interdit sur le serveur. (Bannis par ${bot.user.username})`);
                bot.users.get(bot.config.OWNER_ID).send(`Le bot **${member.user.username}** vient d'être bannis du serveur.`).catch(() => undefined);
            } else {
                bot.users.get(bot.config.OWNER_ID).send(`Le bot **${member.user.username}** ne peut pas être bannis !`).catch(() => undefined);
            };
        };
        return member.guild.channels.get(bot.config.JOIN_CHANNEL_ID).send(bot.function.eventActivity(bot.config.JOIN_MESSAGE, member));
    };
};