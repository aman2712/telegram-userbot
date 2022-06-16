const axios = require("axios");

module.exports = (client) => async (event) => {
  const message = event.message;
  const city = message.message.split(" ").slice(1).join(" ");

  message.delete({ revoke: true });

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );

  await client.sendMessage(message.chatId, {
    message: `Weather in ${city} (Lon: ${data.coord.lon} Lat: ${data.coord.lat}):\nMainly: ${data.weather[0].main}\nDescription: ${data.weather[0].description}\nTemperature: ${data.main.temp}`,
  });
};
