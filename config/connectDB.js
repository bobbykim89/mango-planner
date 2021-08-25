if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const MongoUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
