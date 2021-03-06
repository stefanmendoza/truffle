const command = {
  command: "console",
  description:
    "Run a console with contract abstractions and commands available",
  builder: {},
  help: {
    usage: "truffle console [--verbose-rpc]",
    options: [
      {
        option: "--verbose-rpc",
        description:
          "Log communication between Truffle and the Ethereum client."
      }
    ],
    allowedGlobalOptions: ["network", "config"]
  },
  run: async function (options) {
    const Config = require("@truffle/config");
    const Console = require("../console");
    const { Environment } = require("@truffle/environment");

    const config = Config.detect(options);

    // This require a smell?
    const commands = require("./index");
    const excluded = new Set(["console", "init", "watch", "develop"]);

    const consoleCommands = Object.keys(commands).reduce((acc, name) => {
      return !excluded.has(name)
        ? Object.assign(acc, {[name]: commands[name]})
        : acc;
    }, {});

    await Environment.detect(config);
    const c = new Console(consoleCommands, config.with({noAliases: true}));
    return await c.start();
  }
};

module.exports = command;
