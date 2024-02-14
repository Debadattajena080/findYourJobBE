const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jobRouters = require("./routes/jobRoutes");

app.use(cors());
const PORT = 5000;
const DB_URL = "mongodb://127.0.0.1:27017/JobSeekers";

app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
});

app.use(jobRouters);
