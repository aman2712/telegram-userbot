const axios = require("axios");

module.exports = (client) => async (event) => {
  const message = event.message;
  const q = message.message.split(" ").slice(1).join("+");

  message.delete({ revoke: true });

  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${process.env.IMAGE_API_KEY}&q=${q}`
  );

  await client.sendMessage(message.chatId, {
    file: data.hits[0].largeImageURL,
    message: q
  });
};
