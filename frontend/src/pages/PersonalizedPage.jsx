import React, { useState } from 'react'
import styled from 'styled-components';
import { Box, TextField, MenuItem, Button} from "@mui/material";
import NewsTile from "../components/NewsTile";
import { countries } from "../utils/Countries";
import { newsCategories } from "../utils/newsCategories";
import LinearProgress from '@mui/material/LinearProgress';
const PersonalizedPage = () => {
  const [personalizedUrl, setPersonalizedUrl] = useState("");
  const [category, setCategory] = useState("Category");
  const [country, setCountry] = useState("Country");
  const [loading, setLoading] = useState(true);
  const handleAddPreferrences = () => {
    const prefUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=63ad2b1e940942df92a9bec4373642e3`;
    setPersonalizedUrl(prefUrl);
    setLoading(false);
  }
  return (
    <Root>
      <Box className='personalized-box'>
        <Box className='country'>
          <TextField
            name="country"
            variant="outlined"
            fullWidth
            size="small"
            value={country}
            label='Country'
            placeholder="Country"
            onChange={(e) => { console.log(e.target); setCountry(e.target.value) }}
            select
          >
            {countries.map((option) => {
              return (
                <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
              )
            })}
          </TextField>
        </Box>
        <Box className='category'>
          <TextField
            name="category"
            variant="outlined"
            fullWidth
            size="small"
            value={category}
            label='Category'
            placeholder="Category"
            onChange={(e) => { console.log(e.target); setCategory(e.target.value) }}
            select
          >
            {newsCategories.map((category) => {
              return (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              )
            })}
          </TextField>
        </Box>
        <Box className='makeurl'>
          <Button className='makeurl-btn' variant='outlined' onClick={handleAddPreferrences}>Find</Button>
        </Box>
      </Box>
      {loading ? <LinearProgress className='progress-bar' color="success"/> : <NewsTile url={personalizedUrl} />}
    </Root>
  )
}

const Root = styled.div`
  .personalized-box{
    display: flex;
    margin-bottom: 10px;
    padding: 10px 0px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    border-left: 2px solid #086D67;
    border-radius: 5px;
    min-width: 600px;
    min-height: 50px;
    color: #045350;
  }
  .country{
    width: 40%;
    margin-right: 20px;
    margin-left: 15px;
  }
  .category{
    width: 40%;
    margin-right: 10px;
    margin-left: 10px;
  }
  .makeurl{
    width: 10%;
    margin-left: 25px;
  }
  .makeurl-btn{
    width: 90%;
    font-weight: bold;
    background-color: white;
    color: #086D67;
    text-transform: none;
    &:hover {
      background-color: #086D67;
      color: whitesmoke;
    }
  }
  .country-label{
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 150px;
    color: #086D67;
  }
  .category-label{
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 150px;
    color: #086D67;
  }
  .progress-bar{
    color: #086d67;
    margin-top: 1%;
  }
`;

export default PersonalizedPage;

