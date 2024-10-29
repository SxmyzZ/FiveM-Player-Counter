/////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////

const Discord = require("discord.js");
const client = new Discord.Client();
const fivereborn = require('fivereborn-query');
let configs = {
    "activityType": "WATCHING",
    "token": "bot token",
    "serverInfo": [
        "ip serveur",
        30198
    ]
}

/////////////////////////////////////////////////////
// START THE BOT
/////////////////////////////////////////////////////

client.login(configs.token)
  .then(
    () => {
      console.log("Bot demarré!");
      console.log("Réception des informations, veuillez patienter...");
    },
    () => {
      client.destroy();
      console.log("Bot crash!");
    });

/////////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////////

function activity() {
  setTimeout(() => {
    fivereborn.query(configs.serverInfo[0], configs.serverInfo[1], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data)
        client.user.setActivity(data.clients + "/" + data.maxclients + " joueurs en ville", { type: configs.activityType });
      }
    });
    activity();
  }, 10000);
}
activity();
