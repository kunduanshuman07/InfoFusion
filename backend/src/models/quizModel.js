import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [
        {
            questionText: {
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
        },
    ],
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
        },
    ],
},
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
