import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            options: [
                {
                    optionText: {
                        type: String,
                        required: true,
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                    },
                },
            ],
        },
    ],
    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            score: {
                type: Number,
            },
            iqr:{
                type: Number,
            }
        },
    ],
    bestUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
