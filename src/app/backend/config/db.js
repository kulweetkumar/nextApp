const mongoose = require("mongoose");
const DB = process.env.DATABASE;
 
const connectDB = (app) => {
    mongoose
      .connect(DB) // Assuming DB is defined elsewhere
      .then(async () => {
        console.log("Database connected successfully");
        await app.prepare();
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  };
  
  module.exports = connectDB;