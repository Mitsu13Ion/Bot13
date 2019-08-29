module.exports = class Ready extends require("../structures/Event") {
    constructor(args) {
        super(args, {
            name: "ready"
        });
    };

    run(bot) {
        let statuse = ["Surveiller Partage ?", "Regarder les actualitées !"];
        let status = statuse[Math.floor(Math.random() * statuse.length)];
        bot.user.setActivity(status, {url: "https://www.twitch.tv/blblbl", type: "STREAMING"});
        console.log("--------------------------------------");
        console.log('Connexion effectuée !');
        setInterval(() => {
            let statuse = ["Surveiller Partage ?", "Regarder les actualitées !"];
            let status = statuse[Math.floor(Math.random() * statuse.length)];
            bot.user.setActivity(status, {url: "https://www.twitch.tv/blblbl", type: 'STREAMING'});
        }, 100000);
    };
};