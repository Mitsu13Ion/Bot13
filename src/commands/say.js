module.exports = class Say extends require("../structures/Command") {
    constructor(bot) {
        super(bot, {
            name: "say",
            description: "Fait parler le bot.",
            category: "Owner",
            usage: "say [message]",
        });
    };

    async run(bot, message, args) {
        if (!args[0]) return this.missingArg(message);
        await message.delete();
        return message.channel.send(args.join(" "));  
    };
};