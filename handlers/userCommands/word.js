const axios = require("axios");

module.exports = (client) => async (event) => {
  const message = event.message;

  const word = message.message.split(" ")[1];

  message.delete({ revoke: true });

  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  let msg = `**Word**: ${data[0].word}\n**Phonetic**: ${data[0].phonetic}\n**Origin**: ${data[0].origin}\n\n**Meanings**:\n`;

  for (let i = 0; i < data[0].meanings.length; i++) {
    msg += `**${i + 1}. ${data[0].meanings[i].partOfSpeech}**:\n`;
    for (let j = 0; j < data[0].meanings[i].definitions.length; j++) {
      msg += `  • ${data[0].meanings[i].definitions[j].definition}\n`;
    }
  }

  await client.sendMessage(message.chatId, {
    message: msg,
  });
};
