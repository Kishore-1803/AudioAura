const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const generatePodcastRoute = require('./routes/generatePodcast');

const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/auth', authRoutes);

app.use('/generate', generatePodcastRoute);
app.use('/podcast.mp3', express.static('podcast.mp3'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));