import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PostUpload from './PostUploadDialog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ConnectPosts = () => {
    const navigate = useNavigate();
    const [postUpload, setPostUpload] = useState(false);
    const [combinedDetailsArray, setCombinedDetailsArray] = useState([]);
    const handleCreatePost = () => {
        setPostUpload(true);
    }
    const handleClose = () => {
        setPostUpload(false);
    }
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/post/get-posts');
                const userDetailsPromises = data.map(async (post) => {
                    const userResponse = await axios.post('http://localhost:3000/user/user-details', { userId: post.userId });
                    return {
                        postDetails: post,
                        userDetails: userResponse.data,
                    };
                });

                const combinedDetails = await Promise.all(userDetailsPromises);
                console.log(combinedDetails);
                setCombinedDetailsArray(combinedDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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
                {combinedDetailsArray?.map((post, index) => (
                    <Box className='posts' key={index}>
                        <Box className='header'>
                            <Avatar src={`http://localhost:3000/userImages/${post.userDetails.picturePath}`} alt={post.userDetails.name} onClick={() => navigate(`/profile/${post.userDetails._id}`)} />
                            <Box className='username-name' onClick={() => navigate(`/profile/${post.userDetails._id}`)}>
                                <Typography className='name'>{post.userDetails.name}</Typography>
                                <Typography className='username-time'>@{post.userDetails.username} | 1 minute ago</Typography>
                            </Box>
                        </Box>
                        <Box className='caption'>
                            <Typography className='caption-text'>{post.postDetails.postCaption}</Typography>
                        </Box>
                        <Box className='image'>
                            <img src={`http://localhost:3000/postImages/${post.postDetails.postImage}`} alt='Loading' className='post-img' />
                        </Box>
                        <Box className='like-comment-follow'>
                            <Button startIcon={<ThumbUpAltIcon style={{}} />} className='like'>{post.postDetails.likes.length} Likes</Button>
                            <Button startIcon={<MarkChatUnreadIcon style={{}} />} className='comment'>{post.postDetails.comments.length} Comments</Button>
                            <Button startIcon={<GroupAddIcon style={{}} />} className='connect'>Connect</Button>
                        </Box>
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