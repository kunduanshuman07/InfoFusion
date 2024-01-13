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
    default: "",
  },
  location: {
    type: String,
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
  rating: {
    type: Number,
    default: 100,
  },
  highestRating: {
    type: Number,
    default: ""
  },
  github: {
    type: String,
    default: "",
  },
  linkedin:{
    type: String,
    default: ""
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
      iqr: {
        type: Number,
        required: true,
      },
      timetaken: {
        type: Date,
      },
      overallRating: {
        type: Number,
      }
    },
  ],
  connections:[
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    }
  ],
  messages:[
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      messageText:{
        type: String,
      },
      messageTime: {
        type: Date,
      }
    }
  ],
  notifications:[
    {
      notificationText:{
        type: String,
      },
      notificationTime: {
        type: Date,
      },
    }
  ],
  posts: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;