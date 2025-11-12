const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas Connected: ${conn.connection.name}`);

    // Enable database query monitoring in production
    if (process.env.NODE_ENV === 'production') {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        const timestamp = new Date().toISOString();
        console.log(`[DB QUERY] ${timestamp} - ${collectionName}.${method}`, JSON.stringify(query), doc || '');
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = connectDB;
