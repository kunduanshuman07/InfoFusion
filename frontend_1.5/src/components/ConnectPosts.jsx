import { Avatar, Box, Button, IconButton, TextField, Typography, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PostUpload from './PostUploadDialog';
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const ConnectPosts = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [postUpload, setPostUpload] = useState(false);
    const [combinedDetailsArray, setCombinedDetailsArray] = useState([]);
    const [openCommentModalForPost, setOpenCommentModalForPost] = useState(null);
    const [commentText, setCommentText] = useState('');

    const handleSendRequest = async (connectUserId) => {
        // await axios.post('http://localhost:3000/user/send-connection-request', { actualUserId: user._id, connectionUserId: connectUserId });
    }

    const handleCommentModal = (postId) => {
        setOpenCommentModalForPost(postId);
    }
    const handlePostComment = async (postId) => {
        const commentdata = {
            postId: openCommentModalForPost,
            userId: user._id,
            commentText: commentText,
        }
        await axios.post('http://localhost:3000/post/post-comment', commentdata);
        const { data } = await axios.post('http://localhost:3000/post/get-posts', { userId: user._id });
        setCombinedDetailsArray(data);
    }
    const handleCommentModalClose = () => {
        setOpenCommentModalForPost(null);
    }
    const handleCreatePost = () => {
        setPostUpload(true);
    }
    const handleClose = async () => {
        setPostUpload(false);
        const { data } = await axios.post('http://localhost:3000/post/get-posts', { userId: user._id });
        setCombinedDetailsArray(data);

    }
    const handleLikePost = async (postId) => {
        await axios.post('http://localhost:3000/post/like-post', { userId: user._id, postId: postId });
        const { data } = await axios.post('http://localhost:3000/post/get-posts', { userId: user._id });
        setCombinedDetailsArray(data);
    }
    const handleDislikePost = async (postId) => {
        await axios.post('http://localhost:3000/post/dislike-post', { userId: user._id, postId: postId });
        const { data } = await axios.post('http://localhost:3000/post/get-posts', { userId: user._id });
        setCombinedDetailsArray(data);
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.post('http://localhost:3000/post/get-posts', { userId: user._id });
            setCombinedDetailsArray(data);
        };

        fetchPosts();
    }, []);

    return (
        <Root>
            <Box className='container'>
                <Box className='create-posts'>
                    <Button startIcon={<AddAPhotoIcon />} className='create-post-btn' onClick={handleCreatePost}>Create Post</Button>
                    <Button startIcon={<DynamicFeedIcon />} className='my-posts-btn'>My Posts</Button>
                </Box>
                {combinedDetailsArray?.map((posts) => (
                    <Box className='posts'>
                        <Box className='header'>
                            <Avatar src={`http://localhost:3000/userImages/${posts?.postData?.user?.picturePath}`} alt={posts?.postData?.user?.name} onClick={() => navigate(`/profile/${posts?.postData?.user?._id}`)} />
                            <Box className='username-name' onClick={() => navigate(`/profile/${posts?.postData?.user?._id}`)}>
                                <Typography className='name'>{posts?.postData?.user?.name}</Typography>
                                <Typography className='username-time'>@{posts?.postData?.user?.username} | 1 minute ago</Typography>
                            </Box>
                        </Box>
                        <Box className='caption'>
                            <Typography className='caption-text'>{posts?.postData?.post?.postCaption}</Typography>
                        </Box>
                        <Box className='image'>
                            <img src={`http://localhost:3000/postImages/${posts?.postData?.post?.postImage}`} alt='Loading' className='post-img' />
                        </Box>
                        <Box className='like-comment-follow'>
                            {posts?.postData?.isLiked === false ? <Button startIcon={<ThumbUpOutlinedIcon style={{}} />} className='like' onClick={() => handleLikePost(posts?.postData.post?._id)}>{posts?.postData?.post?.likes?.length} Likes</Button> : <Button startIcon={<ThumbUpAltIcon style={{}} />} className='like' onClick={() => handleDislikePost(posts?.postData.post?._id)}>{posts?.postData?.post?.likes?.length} Likes</Button>}
                            <Button startIcon={<MarkChatUnreadIcon style={{}} />} onClick={() => handleCommentModal(posts?.postData.post?._id)} className='comment'>{posts?.postData?.post?.comments?.length} Comments</Button>
                            <Button startIcon={<GroupAddIcon style={{}} />} className='connect' onClick={()=>handleSendRequest(posts?.postData?.user?._id)}>Connect</Button>
                        </Box>
                        {openCommentModalForPost === posts?.postData?.post?._id && (
                            <Box className='comment-modal'>
                                <Box className='comment-header'>
                                    <Typography className='comment-header-text'>Comments</Typography>
                                    <TextField placeholder='comment' size='small' sx={{ marginLeft: "auto" }} onChange={(e) => setCommentText(e.target.value)} InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button className='comment-btn' onClick={handlePostComment}>Post</Button>
                                            </InputAdornment>
                                        )
                                    }} />
                                    <IconButton onClick={handleCommentModalClose} className='comment-close'><CloseIcon style={{ fontSize: "15px" }} /></IconButton>
                                </Box>
                                {posts?.postData?.commentsData?.map((comments) => (
                                    <Box className='comments'>
                                        <Avatar src={`http://localhost:3000/userImages/${comments?.commentUser?.picturePath}`} alt={comments?.commentUser?.name} style={{ width: "20px", height: "20px" }} />
                                        <Typography className='comment-text'>{comments.commentText}</Typography>
                                        <IconButton className='comment-delete'><DeleteIcon style={{ fontSize: "13px" }} /></IconButton>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}

            </Box>
            {postUpload && <PostUpload onCloseModal={handleClose} />}
        </Root>
    )
}

const Root = styled.div`
    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        border-right: 2px solid #d7e7fa;
        padding-right: 70px;
    }
    .create-posts{
        margin-left: 100px;
        
    }
    .comment-modal{
        display: flex;
        flex-direction: column;
        border-top: 2px solid #d7e7fa;
        max-height: 200px;
        overflow-y: auto;
        margin-bottom: 10px;
    }
    .comment-header{
        display: flex;
        margin-top: 5px;
    }
    .comments{
        display: flex;
        margin-top: 15px;
    }
    .comment-header-text{
        color: #0072e5;
        font-weight: bold;
        margin-top: 5px;
       
    }
    .comment-text{
        font-size: 14px;
        margin-left: 5px;
        color: #444444;
        word-wrap: break-word;
        max-width: 360px;
    }
    .comment-btn{
        text-transform: none;
        font-size: 12px;
        font-weight: bold;
    }
    .comment-time{
        font-size: 12px;
        margin-left: auto;
        margin-right: 10px;
    }
    .comment-close{
        margin-left: auto;
        margin-top: 0px;
    }
    .comment-delete{
        margin-left: auto;
        margin-top: -5px;
    }
    .create-post-btn{
        text-transform: none;
        font-weight: bold;
        background-color: #01264a;
        color: white;
        padding: 5px 20px;
        border-radius: 10px;
        &:hover{
            background-color: #d7e7fa;
            color: #01264a;
        }
    }
    .my-posts-btn{
        margin-left: 40px;
        text-transform: none;
        font-weight: bold;
        background-color: #01264a;
        color: white;
        padding: 5px 20px;
        border-radius: 10px;
        &:hover{
            background-color: #d7e7fa;
            color: #01264a;
        }
    }
    .posts{
        display: flex;
        width: 500px;
        min-width: 500px;
        flex-direction: column;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
        margin-left: 80px;
        margin-top: 15px;
        background-color: white;
        padding: 20px 20px 5px 20px;
        border-radius: 20px;
        border: 1px solid #d7e7fa;
        cursor: pointer;
    }
    .header{
        display: flex;
        border-bottom: 2px solid #d7e7fa;
        padding: 10px;
    }
    .username-name{
        margin-left: 10px;
    }
    .name{
        margin-left: 5px;
        font-weight: bold;
    }
    .username-time{
        font-size: 11px;
        font-weight: bold;
        color: #A5A5A5;
    }
    .caption{
        margin-top: 10px;
    }
    .like-comment-follow{
        display: flex;
        margin-top: 30px;
        border-top: 2px solid #d7e7fa; 
    }
    .image{
        display: flex;
        margin-top: 20px;
    }
    .post-img{
        width: 70%;
        height: 200px;
        border-radius: 5px;
        margin: auto;
    }
    .like{
        text-transform: none;
        font-weight: bold;
    }
    .comment{
        margin: auto;
        text-transform: none;
        font-weight: bold;
    }
    .connect{
        text-transform: none;
        font-weight: bold;
    }
`

export default ConnectPosts