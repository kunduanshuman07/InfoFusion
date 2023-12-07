import React, { useState, useEffect } from 'react'
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import Logo from "../assets/InfoFusion.png";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
function Item({ key, item }) {
  return (
    <Paper>
      <Root>
        <Box>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Box>
        <Box className='image-box'>
          {item.urlToImage ? <img height="240" width="320" src={item.urlToImage} alt="news" /> : <img alt="InfoFusion" src={Logo} width={360} height="240" />}
        </Box>
        <Box className='checkout-btn'>
          <Button variant="contained" className="check-button" href={item.url} target="_blank">
            Check it out!
          </Button>
        </Box>
      </Root>
    </Paper>
  )
}
const CarouselComponent = ({ url }) => {
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
    <CarouselRoot>
      <Carousel>
        {
          loading ? <CircularProgress className='progress-bar' /> : headlines.map((e, index) => <Item key={index} item={e} />)
        }

      </Carousel>
    </CarouselRoot>
  )
}

const Root = styled.div`
  margin: 10px;
  border: 5px solid #086D67;
  padding: 10px;
  .image-box{
    display: flex;
    justify-content: center;
    margin:10px;
  }
  .checkout-btn{
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .check-button{
    background-color: #086D67;
    &:hover {
      background-color: #045350;
    }
  }
`;

const CarouselRoot = styled.div`
  .progress-bar{
    color: #086d67;
    margin-left: 40%;
    margin-top: 20%;
    font-size: 100px;
  }
`;

export default CarouselComponent