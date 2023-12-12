import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from "axios";
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
const NewsTile = ({ url }) => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <div className={loading ? 'blur' : ''}>
        {loading ? <CircularProgress className='progress-bar' /> : headlines.map((e, index) => {
          return (
            <Card key={index} className='card-box' >
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
                <Button variant="outlined" className="check-button" href={e.url} target="_blank">
                  Check it out!
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Root>
  );
};


const Root = styled.div`
  &.blur {
    filter: blur(1px);
  }
  .card-box {
    display: flex;
    margin: 20px;
    cursor: pointer;
    padding: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
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
  .progress-bar{
    color: #086d67;
    margin-left: 45%;
    margin-top: 15%;
    font-size: 100px;
  }
  .title{
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #086D67;
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
    color: #086D67;
    background-color: #086D67;
    color: whitesmoke;
    text-transform: none;
    padding: 0px;
    &:hover {
      background-color: whitesmoke;
      color: #086D67;
    }
  }
`;

export default NewsTile;
