import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, TextField, InputAdornment, Avatar, CardMedia } from '@mui/material'
import styled from 'styled-components'
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import RohitLogo from "../assets/RohitSharma.avif";
import axios from "axios";
import moment from "moment";
const OpinionDialog = ({ onCloseModal, postId }) => {
    const [post, setPost] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [opinion, setOpinion] = useState('');
    const [opinions, setOpinions] = useState([]);
    useEffect(()=>{
        const fetchPost = async() =>{
            const {data} = await axios.post('http://localhost:3000/post/get-single-post', {postId: postId});
            setOpinions(data.opinions);
            setPost(data);
        }
        fetchPost();
    },[postId])
    
    const handleDisplayOpinion = async () => {
        const opinionData = {
            username: user.username,
            postId: postId,
            opinionText: opinion,
            timeOfPost: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        const {data} = await axios.patch('http://localhost:3000/post/post-opinion', opinionData);
        setOpinions(data.opinions);
        setOpinion('');
    };
    return (
        <Dialog open={true} fullScreen onClose={onCloseModal}>
            <DialogTitle
                sx={{
                    display: "flex",
                    backgroundColor: "#086D67",
                    fontSize: "19px",
                    fontWeight: "bolder",
                    height: "70px",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Box>
                    <Typography style={{ color: "white", margin: "auto", fontWeight: "bold" }}>{post.postTitle}
                    </Typography>
                </Box>
                <Box className='timer' style={{ display: "flex", cursor: "pointer", marginLeft: "auto", backgroundColor: "white", color: "#086D67", borderRadius: "20px", fontWeight: "bolder", padding: "0px" }}>
                    <IconButton onClick={onCloseModal} size='small'>
                        <CloseIcon className="close-icon" style={{fontWeight: "bolder"}} />
                    </IconButton>
                </Box>

            </DialogTitle>
            <DialogContent>
                <Root>
                    <Box className="description-opinion-logo">
                        <Box className="desc">
                            <Typography Typography className="description" >
                                {post.postDescription}
                            </Typography >
                        </Box>
                        <Box className="media-textfield">
                            <CardMedia component="img" className="card-media" image={RohitLogo} alt="opinion img" />
                        </Box>
                    </Box>
                    <Box className="post-opinion">
                        <TextField
                            size="small"
                            name="opinion"
                            placeholder="Post your opinion"
                            fullWidth
                            value={opinion}
                            onChange={(e) => setOpinion(e.target.value)}
                            multiline
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleDisplayOpinion} size="small">
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box className="opinions">
                        {opinions.map((opinion, index) => (
                            <Box className='text-avatar'>
                                <IconButton color='inherit'>
                                    <Avatar alt={user.name} src='avatar' className='avatar-style' size='small' />
                                </IconButton>
                                <Typography key={index} style={{ margin: "auto 10px", border: "2px solid #ddd", borderRadius: "10px", padding: "10px", color: "#086D67" }}>{opinion.opinionText}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Root>
            </DialogContent>
        </Dialog>
    )
}
const Root = styled.div`
.display: flex;
flex-direction: column;
.description-opinion-logo{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    border-bottom: 5px solid #ddd;
    padding-bottom: 10px;
}
.media-textfield{
    display: flex;
    flex-direction: column;
    width: 30%;
    border-left: 5px solid #ddd;
    padding: 10px;
}
.desc{
    width: 70%;
    padding: 10px;
    margin-top: 15px;
}
.card-media{
    padding: 10px;
    margin: auto;
    width: 100%;
    height: 100%;

  }
  .text-avatar{
    display: flex;
    margin: 10px;
  }
  .description{
    color: #086D67;
    font-weight: bolder;
  }
  .post-opinion{
    margin-top: 10px;
    border-bottom: 5px solid #ddd;
    padding-bottom: 10px;
  }
  .avatar-style{
    background-color: #086D67;
  }
`
export default OpinionDialog