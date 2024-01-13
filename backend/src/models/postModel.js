import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postCaption: {
        type: String,
    },
    postImage: {
        type: String,
    },
    username: {
        type: String,
    },
    userName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    userPicturePath: {
        type: String,
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
    likes:{
        type: Number,
    }
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;