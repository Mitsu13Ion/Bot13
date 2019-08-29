module.exports = class GuildMemberRemvoe extends require("../structures/Event") {
    constructor(args) {
        super(args, {
            name: "guildMemberRemove"
        });
    };

    async run(bot, member) {
        if (member.guild.id !== bot.config.PARTAGE_ID) return;
        return member.guild.channels.get(bot.config.LEAVE_CHANNEL_ID).send(bot.function.eventActivity(bot.config.LEAVE_MESSAGE, member));
    };
};