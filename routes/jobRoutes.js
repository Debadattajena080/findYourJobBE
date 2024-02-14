const express = require("express");
const mongoose = require("mongoose");
// const User = require("../models/jobModels");
const Job = require("../models/jobModels");

const router = express.Router();

//POST method for creating user
router.post("/", async (req, res) => {
  const { title, company, description, location, posted, applicants } =
    req.body;
  try {
    const jobData = await Job.create({
      title: title,
      company: company,
      description: description,
      location: location,
      posted: posted,
      applicants: applicants,
    });
    res.status(201).json(jobData);
  } catch (error) {
    console.log(error);
    // res.send(400).json({ error: error.message });
  }
});

//Get method for getting all the user
router.get("/", async (req, res) => {
  try {
    const getAllJob = await Job.find();
    res.status(200).json(getAllJob);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

//Get single user by id
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const getSingleUser = await User.findById({ _id: id });
//     res.status(200).json(getSingleUser);
//   } catch (error) {
//     console.log(error);
//     res.send(500).json({ error: error.message });
//   }
// });

//Delete user
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const getSingleUser = await User.findByIdAndDelete({ _id: id });
//     res.status(200).json(getSingleUser);
//   } catch (error) {
//     console.log(error);
//     res.send(500).json({ error: error.message });
//   }
// });

//Update user
// router.patch("/:id", async (req, res) => {
//   const { id } = req.params;
//   const {username, email} = req.body;
//   try {
//     const updateUser = await User.findByIdAndUpdate(id, req.body,{
//         new: true,
//     });
//     res.status(200).json(updateUser);
//   } catch (error) {
//     console.log(error);
//     res.send(500).json({ error: error.message });
//   }
// });

router.get("/$search", async (req, res) => {
  const { query } = req.query;

  console.log("Search", query);

  try {
    const results = await Job.find({ $text: { $search: query } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
