const axios = require("axios");

module.exports = (client) => async (event) => {
  const message = event.message;

  message.delete({ revoke: true });

  const { data } = await axios.get("https://api.quotable.io/random");

  let msg = `"${data.content}"\n\n-**${data.author}**\n\n`;

  await client.sendMessage(message.chatId, {
    message: msg,
  });
};
