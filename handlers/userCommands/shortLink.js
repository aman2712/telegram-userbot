const BitlyClient = require("bitly").BitlyClient;
const bitly = new BitlyClient(process.env.BITLY_ACCESS_TOKEN);

module.exports = (client) => async (event) => {
  const message = event.message;

  const url = message.message.split(" ")[1];

  message.delete({ revoke: true });

  const response = await bitly.shorten(url);

  await client.sendMessage(message.chatId, {
    message: response.link,
  });
};
