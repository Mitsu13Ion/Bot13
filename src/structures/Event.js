module.exports = class Event {
    constructor(bot, event) {
        this.bot = bot;
        this.name = event.name;
    };

    run(...event) {
        try {
            return this.run(...event);
        } catch (err) {
            return console.log(err);
        };
    };
};