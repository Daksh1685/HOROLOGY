require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDB = require('./seed');

const startServer = async () => {
  await connectDB();
  await seedDB();
};

startServer();
const app = express();

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true); // Allow all origins dynamically
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.json({ success: true, message: '⌚ Luxury Watches API is running' }));

app.use('/auth', require('./routes/auth'));
app.use('/watches', require('./routes/watches'));
app.use('/user', require('./routes/user'));
app.use('/inquiry', require('./routes/inquiry'));

app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;