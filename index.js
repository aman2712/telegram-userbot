require("dotenv").config();
const { TelegramClient } = require("telegram");
const { StoreSession } = require("telegram/sessions");
const express = require("express");
const { NewMessage } = require("telegram/events");

const clientStarter = require("./handlers/clientStarter");
const spam = require("./handlers/userCommands/spam");
const weather = require("./handlers/userCommands/weather");
const meme = require("./handlers/userCommands/meme");
const imgSearch = require("./handlers/userCommands/searchImage");
const { up, low, capLow } = require("./handlers/userCommands/caseChanger");
const word = require("./handlers/userCommands/word");
const shortLink = require("./handlers/userCommands/shortLink");
const quote = require("./handlers/userCommands/quote");

const app = express();

const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const storeSession = new StoreSession("hello");

(async () => {
  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await clientStarter(client);

  client.getDialogs({});

  client.addEventHandler(
    spam(client),
    new NewMessage({ outgoing: true, pattern: /^.spam .*/ })
  );

  client.addEventHandler(
    weather(client),
    new NewMessage({ outgoing: true, pattern: /^.weather .*/ })
  );

  client.addEventHandler(
    meme(client),
    new NewMessage({ outgoing: true, pattern: /^.meme/ })
  );

  client.addEventHandler(
    low(client),
    new NewMessage({ outgoing: true, pattern: /^.low/ })
  );

  client.addEventHandler(
    up(client),
    new NewMessage({ outgoing: true, pattern: /^.up/ })
  );

  client.addEventHandler(
    capLow(client),
    new NewMessage({ outgoing: true, pattern: /^.caplow/ })
  );

  client.addEventHandler(
    imgSearch(client),
    new NewMessage({ outgoing: true, pattern: /^.img/ })
  );

  client.addEventHandler(
    word(client),
    new NewMessage({ outgoing: true, pattern: /^.meaning .*/ })
  );

  client.addEventHandler(
    shortLink(client),
    new NewMessage({ outgoing: true, pattern: /^.shorten .*/ })
  );

  client.addEventHandler(
    quote(client),
    new NewMessage({ outgoing: true, pattern: /^.quote/ })
  );
})();

app.listen(process.env.PORT || 3000, () => {
  console.log("Binded to PORT");
});
