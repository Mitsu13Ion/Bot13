module.exports = class Functions {
    constructor(bot) {
        this.bot = bot;
    };

    fetchUsers(m, message) {
        if (!m) return undefined;
        var search = m.trim().toLowerCase();
        if (search === "") return undefined;
        var userUsername = message.guild.members.filter(e => e.user.username.toLowerCase().includes(search)).first();
        var userNickname = message.guild.members.filter(e => e.displayName.toLowerCase().includes(search)).first();
        var userTag = message.guild.members.filter(e => e.user.discriminator.toLowerCase().includes(search)).first();
        var userMention = message.guild.members.get(search.trim().replace(/\D/g, ""));
        var userID =  message.guild.members.get(search);
        var randomUser = search.split(" ").pop().toLowerCase() === "random" ? message.guild.members.random() : undefined;
        return (!userMention ? undefined : userMention.user) || userID || (!userTag ? undefined : userTag.user) || (!userUsername ? undefined : userUsername.user) || (!userNickname ? undefined : userNickname.user) || (!randomUser ? undefined : randomUser.user);
    };

    eventActivity(msg, member) {
        return msg.replace(/{guild}/gi, member.guild.name)
        .replace(/{user}/gi, member)
        .replace(/{username}/gi, member.user.username)
        .replace(/{usernick}/g, member.displayName)
        .replace(/{usertag}/gi, member.user.tag)
        .replace(/{membercount}/gi, member.guild.memberCount)
        .replace(/{memberposition}/gi, member.guild.memberCount + "eme");
    };
};