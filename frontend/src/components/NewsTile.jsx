import React, { useEffect, useState } from 'react'
import { Card, Grid } from '@mui/material';
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
        setHeadlines(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHeadlines();
  }, []);
  return (
    <Root className={loading ? 'blur' : ''}>
      {loading ? <CircularProgress className='progress-bar' /> : headlines.map((e, index) => {
        return (
          <Card key={index} className='card-content'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card className='image-box'>
                  <img height="220" width="260" src={e.urlToImage} alt="news" />
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} className='text-boxes'>
                <Card className='text-box'>{e.title}</Card>
                <Card className='text-box'>{e.description}</Card>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </Root>
  );
};

const Root = styled.div`
  &.blur {
    filter: blur(1px);
  }
  .card-content {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #086d67;
  }

  .image-box {
    height: 100%;
    min-height: 150px; 
    color: white;
    padding: 10px;
  }
  .text-boxes{
    margin-bottom: 10px;
  }
  .text-box{
    height: 50%; 
    background-color: white;
    border: 1px solid #086d67; 
    margin-bottom: 10px;
    padding: 5px; 
  }
  .progress-bar{
    color: #086d67;
    margin-left: 40%;
    margin-top: 20%;
    font-size: 100px;
  }
`;

export default NewsTile;
