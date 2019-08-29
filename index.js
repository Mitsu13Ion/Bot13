const {Client, Collection} = require("discord.js");
const FUNCTION = require("./src/utils/function");
const fs = require("fs");

new class Bot extends Client {
    constructor() {
        super({disableEveryone: true});
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = require("./config");
        this.function = new FUNCTION(this);
        this.launch();
    };

    launch() {
        this.loadCommands();
        this.loadEvents();
        this.login(this.config.TOKEN);
    };

    loadCommands() {
        return fs.readdir("./src/commands", (err, files) => {
            if (err) throw err;
            if (files.length < 0) return console.log("Aucune commande dans le dossier commandes !");
            return files.filter(file => file.split(".").pop() === "js").forEach(file => {
                const FILE = require(`./src/commands/${file}`);
                if (typeof FILE !== "function") return;
                const command = new FILE(this);
                console.log(`${FILE.name} chargée !`);
                if (command && command.aliases) this.aliases.set(command.aliases, command);
                return this.commands.set(command.name, command);
            });
        });
    };

    loadEvents() {
        process.on("unhandledRejection", err => console.log(err));
        return fs.readdir("./src/events", (err, files) => {
            if (err) throw err;
            if (files.length < 0) return console.log("Aucun event dans le dossier events !");
            return files.filter(file => file.split(".").pop() === "js").forEach(file => {
                const FILE = require(`./src/events/${file}`);
                if (typeof FILE !== "function") return;
                const event = new FILE(this);
                console.log(`${FILE.name} chargée !`);
                return this.on(event.name, (...args) => event.run(this, ...args));
            });
        });
    };
};