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

export const getPosts = async (req, res) => {
    const { userId } = req.body;
    try {
        const allPosts = await Post.find();
        allPosts.sort((a, b) => b.createdAt - a.createdAt);

        const allPostsData = await Promise.all(allPosts.map(async (post) => {
            const user = await User.findById(post.userId);
            const isLiked = post?.likes?.some(instance => instance.userId.toString() === userId);
            const comments = post.comments;
            const commentsData = await Promise.all(comments.map(async (comment) => {
                const commentUser = await User.findById(comment.userId);
                const commentText = comment.commentText;
                return {
                    commentUser, commentText
                }
            }))
            return {
                postData: {
                    post: post,
                    user: user,
                    isLiked,
                    commentsData,
                },
            };
        }));

        res.status(200).send(allPostsData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


export const createPost = async (req, res) => {
    const { postCaption, userId } = req.body;
    const postImageFile = req.file;
    const postImg = postImageFile.filename;
    try {
        const newPost = new Post({ userId, postCaption, postImage: postImg });
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

export const likePost = async (req, res) => {
    const { userId, postId} = req.body;
    const timeOfLike = new Date();
    try {
        const post = await Post.findById(postId);
        post.likes.push({ userId: userId });
        const newUser = await User.findById(userId);
        await post.save();
        const allUsers = await User.find();
        allUsers.map((user) => {
            user.posts.map(async (post) => {
                if (post.postId.toString() === postId) {
                    user.notifications.push({ notificationText: `${newUser.name} liked your post.`, notificationTime: timeOfLike });
                    await user.save();
                }
            })
        })
        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const dislikePost = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const post = await Post.findById(postId);
        post.likes = post.likes.filter(user => user.userId.toString() !== userId);
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const postcomment = async (req, res) => {
    const { postId, userId, commentText} = req.body;
    const timeOfComment = new Date();
    try {
        const post = await Post.findById(postId);
        const newUser = await User.findById(userId);
        post.comments.push({ userId: userId, commentText: commentText, timeOfComment: "none" });
        await post.save();
        const allUsers = await User.find();
        allUsers.map((user) => {
            user.posts.map(async (post) => {
                if (post.postId.toString() === postId) {
                    user.notifications.push({ notificationText: `${newUser.name} commented "${commentText}" on your post.`, notificationTime: timeOfComment });
                    await user.save();
                }
            })
        })
        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
