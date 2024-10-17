const mongoose = require("mongoose");

const URI = process.env.VITE_MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to db");
  } catch (e) {
    console.log("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
// pateldhyey649
// 4gbG7sLTOzrPp3X2

//mongodb+srv://pateldhyey649:<db_password>@project2.dz9b0.mongodb.net/?retryWrites=true&w=majority&appName=project2
