import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import axios from "axios";
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
const NewsTile = ({ url }) => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleNewsClick = (newsUrl) =>{
    window.open(newsUrl, '_blank');
  }
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data.articles);
        setHeadlines(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHeadlines();
  }, [headlines, url]);
  return (
    <Root>
      <Box>
        {loading ? <CircularProgress className='progress-bar' size={60}/> : headlines.map((e, index) => {
          return (
            <Card key={index} className='card-box' onClick={()=>handleNewsClick(e.url)}>
              <CardMedia
                component="img"
                className='card-media'
                image={e.urlToImage}
                alt="news"
              />
              <CardContent className='card-content'>
                <Typography className='title'>
                  {e.title}
                </Typography>
                <Typography className='description'>
                  {e.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Root>
  );
};


const Root = styled.div`
  display: flex;
  .card-box {
    display: flex;
    margin: 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
      border: 2px solid #0a686e;
    }
  }
  .card-media{
    padding: 10px;
    margin-top: auto;
    margin-bottom: auto;
    max-width: 200px;
    height: 170px;
    min-width: 180px;
    border-right: 2px solid #0a686e;
  }
  .card-content{
    display: flex;
    flex-direction: column; 
    width: 90%;
  }
  .progress-bar{
    color: #0a686e;
    margin: 100px 400px;
    font-size: 100px;
  }
  .title{
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #0a686e;\
    color: #0a686e;
  }
  .description{
    font-size: 15px;
    color: gray;
    margin-top: 10px;
    font-weight: bold;
  }
  .check-button{
    width: 24%;
    margin-top: 15px;
    margin-left: auto;
    font-weight: bold;
    color: #0a686e;
    background-color: #0a686e;
    color: whitesmoke;
    text-transform: none;
    padding: 0px;
    &:hover {
      background-color: white;
      color: #0a686e;
    }
  }
`;

export default NewsTile;
