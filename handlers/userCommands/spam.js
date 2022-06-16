module.exports = (client) => async (event) => {
  const message = event.message;

  const splittedString = message.message.split(" ");
  const count = splittedString[1];
  const messageToSpam = splittedString.slice(2).join(" ");

  message.delete({ revoke: true });
  for (let i = 0; i < count; i++) {
    await client.sendMessage(message.chatId, {
      message: messageToSpam,
    });
  }
};
