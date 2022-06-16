const low = (client) => async (event) => {
  const message = event.message;

  const splittedString = message.message.split(" ");
  const messageToChange = splittedString.slice(1).join(" ");

  message.delete({ revoke: true });

  await client.sendMessage(message.chatId, {
    message: messageToChange.toLowerCase(),
  });
};

const up = (client) => async (event) => {
  const message = event.message;

  const splittedString = message.message.split(" ");
  const messageToChange = splittedString.slice(1).join(" ");

  message.delete({ revoke: true });

  await client.sendMessage(message.chatId, {
    message: messageToChange.toUpperCase(),
  });
};

const capLow = (client) => async (event) => {
  const message = event.message;

  const splittedString = message.message.split(" ");
  const messageToChange = splittedString.slice(1).join(" ");

  message.delete({ revoke: true });

  let msg = "";
  for (let i = 0; i < messageToChange.length; i++) {
    if (i % 2 === 0) {
      msg += messageToChange[i].toLowerCase();
    } else {
      msg += messageToChange[i].toUpperCase();
    }
  }

  await client.sendMessage(message.chatId, {
    message: msg,
  });
};

module.exports = {
  up,
  low,
  capLow,
};
