const axios = require("axios");

module.exports = (client) => async (event) => {
  const message = event.message;

  message.delete({ revoke: true });

  const { data } = await axios.get("https://meme-api.herokuapp.com/gimme");

  await client.sendMessage(message.chatId, {
    file: data.preview[data.preview.length - 1],
    message: `${data.title}\nCredits: u/${data.author}`,
  });
};
