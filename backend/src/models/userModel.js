import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 15,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  picturePath: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  pincode: {
    type: Number,
    default: "",
  },
  employment: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  university: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 100,
  },
  highestRating: {
    type: Number,
    default: ""
  },
  streak: {
    type: Number,
    default: 0,
  },
  maxstreak: {
    type: Number,
    default: 0,
  },
  quizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      score: {
        type: Number,
        required: true,
      },
      scorecard: [],
      dateOfQuiz: {
        type: Date,
      },
      rating: {
        type: Number,
        required: true,
      },
      timetaken: {
        type: Date,
      },
    },
  ],
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;