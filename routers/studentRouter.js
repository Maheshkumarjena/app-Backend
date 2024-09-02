import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/users.js"; // Assuming `student.js` exports your Mongoose model

const studentRouter = express.Router();

studentRouter.use(express.json());

studentRouter.post("/student", async (req, res) => {
  try {
    const { name, email, dob, password } = req.body;

    const existingUser = await Student.findOne({ email });
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
    const type = "student";
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log("hashedPassword");
    const newStudent = new Student({
      name,
      email,
      dob,
      password: hashedPassword,
      type,
    });
    console.log(newStudent);
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

export default studentRouter;
