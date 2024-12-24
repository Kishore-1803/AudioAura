const axios = require('axios');

async function fetchWeather(city) {
  const response = await axios.get(`http://api.weatherstack.com/current?access_key=0bc833dc7c7cd05f871bed625f5d4594&query=${city}`);
  return response.data.current;
}


async function fetchNews(country, topic) {
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=c99565bb3b8241b4aa3a1cc60624d16e&country=us`);
  return response.data.articles;
}

module.exports = { fetchWeather, fetchNews };