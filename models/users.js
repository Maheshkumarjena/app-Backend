import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String, // Data type
    required: true, // Makes this field mandatory
    trim: true, // Trims whitespace from the value
  },
  type: {
    type: String,
    enum: ["student", "alumni"], // Ensures the value is one of the specified options
    required: true,
  },
  age: {
    type: Number,
    // required: true,
    min: 15, // Minimum value allowed
  },
  dob: {
    type: Date,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique in the collection
    lowercase: true, // Converts the email to lowercase
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date
  },
  collegeName: {
    type: String,
    validate: {
      validator: function (value) {
        // The 'this' context refers to the document being validated
        return this.type === "student" || (this.type === "alumni" && value);
      },
      message: "College name is required for alumni.",
    },
  },
  collegeLeavingDate: {
    type: Date,
  },
  courseName: {
    type: String,
    trim: true,
  },
  courseDuration: {
    type: Number,
  },

  collegeJoiningDate: {
    type: Date,
  },

  grade: {
    type: String,
  },
  specialization: {
    type: String,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
