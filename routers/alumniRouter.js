import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Alumni from "../models/users.js";

const alumniRouter = express.Router();

alumniRouter.use(express.json());

alumniRouter.post("/alumni", async (req, res) => {
  try {
    const { name, email, dob, password, almaMater, lastYearOfEducation } =
      req.body;

      console.log(almaMater,"<=================== Almamater")
      console.log(lastYearOfEducation,"<=================== collegeleaving date")
    const existingUser = await Alumni.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists " });
    }
    console.log(password);
    if (!name || !email || !dob || !password) {
      console.log("all fields are required");
      return res
        .status(400)
        .json({ error: "All fields are required: name, email, and password" });
    }
    const type = "alumni";
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    const newAlumni = new Alumni({
      name,
      email,
      dob,
      password: hashedPassword,
      type,
      collegeName: almaMater,
      collegeLeavingDate:lastYearOfEducation,
    });

    await newAlumni.save();

    res.status(201).send(newAlumni);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});


export default alumniRouter