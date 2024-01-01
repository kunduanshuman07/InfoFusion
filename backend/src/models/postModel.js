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
                type: String,
            },
            opinionText: {
                type: String, 
            },
            timeOfPost: {
                type: String,
            },
        }
    ],
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;