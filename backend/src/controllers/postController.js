import Post from "../models/postModel.js";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/public/postImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const getPosts = async (req,res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
export const getSinglePost = async (req,res) => {
    const {postId} = req.body;
    console.log(postId);
    try {
        const singlePost = await Post.findById(postId);
        res.status(200).send(singlePost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const createPost = async (req,res) =>{
    const {postTitle, postDescription} = req.body;
    const postImageFile = req.file;
    const postImg = postImageFile.filename;
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
        
        await Post.updateOne(
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
        const findPost = await Post.findById(postId);
        res.status(200).send(findPost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteOpinion = async(req,res)=>{
    const {opinionId, postId} = req.body;
    try {
        const findPost = await Post.findById(postId);
        findPost.opinions.pull({ _id: opinionId });
        await findPost.save();
        res.status(200).send(findPost);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
}