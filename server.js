const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path')

const app = express();

connectDB();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json({ extended: false }));

app.use('/api/visited-places', require('./routes/api/visited-places'));
app.use(
  '/api/social-interactions',
  require('./routes/api/social-interactions')
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
