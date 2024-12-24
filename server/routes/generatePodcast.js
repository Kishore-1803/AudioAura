const express = require('express');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const { fetchWeather, fetchNews } = require('../utils/apiCalls');

const router = express.Router();

router.post('/', async (req, res) => {
  const { city } = req.body;

  try {
      if (!city) {
          throw new Error('City is required');
      }
      const weatherInfo = await fetchWeather(city);
      const newsArticles = await fetchNews();

      const script = `Weather Update: The weather in ${city} is ${weatherInfo.temperature}°C . \n` +
                     `News Update: Here are the latest headlines:\n` +
                     newsArticles.map((article, index) => `${index + 1}. ${article.title}`).join('\n'); // Updated to remove source info

      fs.writeFileSync('script.txt', script);

      exec('gtts-cli -f script.txt -o podcast.mp3', (error, stdout, stderr) => {
          if (error) {
              console.error(`Error generating audio: ${error.message}`);
              return res.status(500).send('Error generating podcast');
          }

          res.send({
              audioUrl: 'http://localhost:5000/podcast.mp3',
              transcript: script,
          });
      });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error generating podcast');
  }
});
module.exports = router;
