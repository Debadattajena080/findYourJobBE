const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
const jobRouters = require("./routes/jobRoutes")

app.use(cors());
const PORT = 5000;
DB_URL = "mongodb://localhost:27017/JobSeekers";
app.use(express.json());
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Db is connected successfully");
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(jobRouters);
