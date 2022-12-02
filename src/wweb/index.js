const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const memes = require("random-memes");

const client = new Client({
  authStrategy: new LocalAuth(),
});

const start = async () => {
  try {
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("authenticated", () => {
      console.log("User authenticated successfully🧑‍🚀");
    });

    client.on("ready", () => {
      console.log("Client is ready to zap!🚀");
    });

    client.on("message", async (message) => {
      if (!message.type == "chat") {
        return;
      }

      if (messge.body == "!meme") {
        const meme = await memes.fromReddit("en");
        client.sendMessage(message.from, MessageMedia())
      }

      if (message.type == audio) {
        console.log("isso é um audio");
      }

      const chat = await message.getChat();
      console.log({ from: chat.name, message: message.body });
    });

    client.initialize();
  } catch (err) {
    console.log("couldn't connect to whatsapp service.", err);
  }
};

module.exports = { start };
