const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

connectDB();

// mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })
//   .then(() => console.log('DB connection successful!'))
//   .catch((err) => console.log('DB connection error:', err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

