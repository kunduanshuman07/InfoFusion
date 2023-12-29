import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postDescription: {
        type: String,
        required: true,
    },
    postImg: {
        type: String,
    },
    opinions: [
        {
            username: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            opinionText: {
                type: String, 
            },
            timeOfPost: {
                type: Date,
            },
        }
    ],
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;