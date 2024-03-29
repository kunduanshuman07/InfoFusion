import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postCaption: {
        type: String,
    },
    postImage: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            commentText: {
                type: String,
            },
            timeOfComment: {
                type: String,
            },
        }
    ],
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }
    ],
    
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;