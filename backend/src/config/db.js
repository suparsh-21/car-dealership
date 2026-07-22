const mongoose = require("mongoose");
const seedAdmin = require("./seedAdmin");
const seedVehicles = require("./seedVehicles");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedAdmin();
    await seedVehicles();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;