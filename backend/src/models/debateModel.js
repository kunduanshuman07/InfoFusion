import mongoose from "mongoose";

const debateSchema = new mongoose.Schema({
    debateTitle: {
        type: String,
    },
    debateId: {
        type: String,
    },
    usersInFavor: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }
    ],
    usersAgainst: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }
    ],
    statementsInFavor: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            upvotes:{
                type: Number,
            },
            statement:{
                type: String,
            }
        }
    ],
    statementsAgainst: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            upvotes:{
                type: Number,
            }
        }
    ],
    likes: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 5,
    },
    status: {
        type: String,
        default: "Active"
    }
    
}, {
    timestamps: true
});

const Debate = mongoose.model("Debate", debateSchema);
export default Debate;