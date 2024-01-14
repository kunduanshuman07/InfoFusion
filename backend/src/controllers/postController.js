import Post from "../models/postModel.js";
import multer from 'multer';
import User from "../models/userModel.js";

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
        allPosts.sort((a,b)=> b.createdAt-a.createdAt);
        res.status(200).send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
export const createPost = async (req,res) =>{
    const {postCaption, userId } = req.body;
    const postImageFile = req.file;
    const postImg = postImageFile.filename;
    try {
        const newPost = new Post({userId, postCaption, postImage:postImg});
        const savedPost = await newPost.save();
        const updatedUser = await User.updateOne(
          { _id: userId },
          {
              $push: {
                  posts: {
                      postId: newPost._id,
                  },
              },
          }
      );
      res.status(200).send(savedPost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
} 