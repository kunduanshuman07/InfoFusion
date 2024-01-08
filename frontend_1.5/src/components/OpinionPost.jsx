import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import OpinionDialog from './OpinionDialog';
import axios from "axios";
const OpinionPost = () => {
  const [openModal, setOpenModal] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [postId, setPostId] = useState();
  const handleOpinionDialog = (postId) => {
    setPostId(postId);
    setOpenModal(true);
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:3000/post/get-posts');
      setAllPosts(data);
      console.log(data);
    }
    fetchPosts();
  }, [])
  const handleClose = () => {
    setOpenModal(false);
  }
  return (
    <>
      <Root>
        <Box>
          {allPosts?.map((posts) => (
            <Card className="card-box" onClick={()=>handleOpinionDialog(posts._id)}>
              <Box className="card-content-media">
                <CardMedia component="img" className="card-media" image={`http://localhost:3000/postImages/${posts.postImg}`} alt="opinion img" />
                <CardContent className="card-content">
                  <Typography className="title">{posts.postTitle}</Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      </Root>
      {openModal && <OpinionDialog onCloseModal={handleClose} postId={postId}/>}
    </>
  );
};
const Root = styled.div`
  .card-box {
    display: flex;
    flex-direction: column;
    margin: 20px;
    cursor: pointer;
    padding: 10px;
    border: 2px solid #d7e7fa ;
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
    max-width: 120px;
    height: 100px;
    min-width: 180px;
    border-right: 2px solid #d7e7fa;
  }
  .card-content{
    display: flex;
    flex-direction: column; 
    width: 90%;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    color: #444444;
    border-bottom: 2px solid #d7e7fa;
    margin: auto;
  }
`;
export default OpinionPost

