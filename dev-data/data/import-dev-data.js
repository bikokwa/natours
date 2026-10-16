const fs = require('fs');
const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dns.setServers([
  '8.8.8.8',
  '8.8.4.4',
]);

dotenv.config({ path: './config.env' });

async function connectDB() {
  try {
    // Connect Mongoose to MongoDB
    await mongoose.connect(process.env.DATABASE);

    console.log('MongoDB connected successfully');
   
  } catch (error) {
    console.error('Database or startup error:', error);
    process.exit(1);
  }
}

connectDB();

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);