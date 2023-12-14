import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
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
  education:{
    type: String,
    default: "",
  },
  university:{
    type: String,
    default: "",
  },
  rating:{
    type: Number,
    default: 100,
  },
  highestRating:{
    type: Number,
    default: ""
  },
  streak: {
    type: Number,
    default: 0,
  },
  maxstreak:{
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
      rating: {
        type: Number,
        required: true,
      },
      timetaken: {
        type: Date,
      },
    },
  ],
},{
    timestamps:true
});

const User=mongoose.model("User",userSchema);
export default User;