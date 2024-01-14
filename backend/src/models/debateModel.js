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
    likes: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 5,
    }
    
}, {
    timestamps: true
});

const Debate = mongoose.model("Debate", debateSchema);
export default Debate;