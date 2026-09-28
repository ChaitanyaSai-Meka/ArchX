const mongoose = require('mongoose');

class Database {
  constructor() {
    if (!Database.instance) {
      this.isConnected = false;
      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    if (this.isConnected) {
      console.log('Using existing database connection');
      return;
    }

    try {
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) {
        console.error('Database connection failed: No connection string provided');
        return;
      }

      await mongoose.connect(dbUrl);
      this.isConnected = true;
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error.message);
    }
  }
}

const database = new Database();
Object.freeze(database);

module.exports = database;
