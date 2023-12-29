import { Box, Typography, Card, CardMedia, CardContent, IconButton, TextField, InputAdornment, Avatar } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import RohitLogo from "../assets/RohitSharma.avif";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SendIcon from "@mui/icons-material/Send";
const OpinionPost = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [comment, setComment] = useState(false);
    const [opinion, setOpinion] = useState('');
    const [opinions, setOpinions] = useState([]);

    const handleDisplayOpinion = () => {
        setOpinions((prevOpinions) => [...prevOpinions, opinion]);
        setOpinion('');
        setComment(false);
    };

    return (
        <Root>
            <Box>
                <Card className="card-box">
                    <Box className="card-content-media">
                        <CardMedia component="img" className="card-media" image={RohitLogo} alt="opinion img" />
                        <CardContent className="card-content">
                            <Typography className="title">Mumbai Indians remove Rohit Sharma from captaincy</Typography>
                            <Typography className="description">
                                The decision to remove Rohit Sharma from the captaincy of the Mumbai Indians after leading the team to five IPL titles would undoubtedly mark a significant and surprising shift in the team's leadership dynamics. Rohit Sharma's tenure as captain has been synonymous with success, and the five championships under his leadership have solidified his legacy as one of the most successful captains in IPL history. Such a move by the team management would likely be based on complex considerations, possibly involving a reassessment of leadership strategies, team dynamics, or other internal factors. It would undoubtedly be met with both speculation and anticipation from fans and the cricketing community at large, as the team transitions into a new era of leadership, and Rohit Sharma takes on different responsibilities within the squad. The dynamics of the Mumbai Indians, one of the most successful franchises in the IPL, would certainly undergo a notable transformation with this unexpected change in captaincy.
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box className="opinion-box">
                        <Box className="post-opinion">
                            <IconButton className="comment-btn" onClick={() => setComment(!comment)}>
                                <MarkUnreadChatAltIcon />
                            </IconButton>
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
                                    <IconButton color="inherit">
                                        <Avatar alt={user.name} src='avatar' className='avatar-style' size='small'/>
                                    </IconButton>
                                    <Typography key={index} style={{margin: "auto 0px"}}>{opinion}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Root>
    );
};
const Root = styled.div`
  .card-box {
    display: flex;
    flex-direction: column;
    margin: 20px;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .card-content-media{
    display: flex;
  }
  .card-media{
    padding: 10px;
    margin-top: auto;
    margin-bottom: auto;
    max-width: 200px;
    height: 170px;
    min-width: 180px;
    border-right: 2px solid #086D67;
  }
  .card-content{
    display: flex;
    flex-direction: column; 
    width: 90%;
  }
  .opinion-box{
    display: flex;
    flex-direction: column;
    border: 2px solid #ddd;
    padding: 0px 5px;
    border-radius: 10px;
    padding-top: 10px;
  }
  .post-opinion{
    display: flex;
  }
  .opinions{
    margin-top: 10px;
    color: #086D67;
  }
  .text-avatar{
    display: flex;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #086D67;
    margin: auto;
  }
  .description{
    font-size: 15px;
    color: gray;
    margin-top: 10px;
    font-weight: bold;
  }
  .comment-btn{
    color: #086D67;
  }
`;
export default OpinionPost