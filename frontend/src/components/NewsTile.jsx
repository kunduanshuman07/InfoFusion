import React, { useEffect, useState } from 'react'
import { Card, Grid } from '@mui/material';
import axios from "axios";
import styled from 'styled-components';
import Logo from "../assets/InfoFusion.png";
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
  }, []);
  return (
    <Root className={loading ? 'blur' : ''}>
      {loading ? <CircularProgress className='progress-bar' /> : headlines.map((e, index) => {
        return (
          <Card key={index} className='card-content'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card className='image-box'>
                  {e.urlToImage ? <img height="220" width="260" src={e.urlToImage} alt="news" /> : <img alt="InfoFusion" src={Logo} width={250} height="85%" />}
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} className='text-boxes'>
                <Card className='text-box'><span>{e.title}</span> | <span>{e.description}</span></Card>
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
    // height: 80%; 
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
