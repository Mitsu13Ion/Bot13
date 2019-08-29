module.exports = class Command {
    constructor(bot, options) {
        this.bot = bot;
        this.name = options.name;
        this.usage = options.usage || "Aucune utilisation spécifiée.";
        this.description = options.description || "Aucune description.";
        this.aliases = options.aliases || "Aucun aliase.";
        this.category = options.category || "Aucune catégorie.";
    };

    missingArg(message) {
        return message.channel.send(`:x: Mauvaise utilisation | ${this.bot.config.PREFIX + this.usage}`);
    };
};