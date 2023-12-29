import Post from "../models/postModel.js";

export const getPosts = async (req,res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const createPost = async (req,res) =>{
    const {postTitle, postDescription, postImg} = req.body;
    try {
        const newPost = new Post({postTitle, postDescription, postImg});
        const savedPost = await newPost.save();
        res.status(200).send(savedPost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 

export const postOpinion = async(req,res)=>{
    const {postId, username, opinionText, timeOfPost} = req.body;
    try {
        const findPost = await Post.findById(postId);
        const updatedPost = await Post.updateOne(
            { _id: postId },
            {
                $push: {
                    opinions: {
                        username: username,
                        opinionText: opinionText,
                        timeOfPost: timeOfPost,
                    },
                },
            }
        );
        res.status(200).send(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}