const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

  const start = () => {
    try {
      client.on("qr", (qr) => {
        console.log("Start your instance 💻", qr);
      });

      client.on("ready", () => {
        console.log("Client is ready to zap!");
      });

      client.initialize()
    } catch (err) {
      console.log("couldn't connect to whatsapp service.", err);
    }
  }

module.exports = {start}