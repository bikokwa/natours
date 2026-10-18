const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

dns.setServers([
  '8.8.8.8',
  '8.8.4.4',
]);


async function connectDB() {
  try {
    // Connect Mongoose to MongoDB
    await mongoose.connect(process.env.DATABASE);

    console.log('MongoDB connected successfully');

    // Start the Express server after the database is ready
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (error) {
    console.error('Database or startup error:', error);
    process.exit(1);
  }
}

connectDB();