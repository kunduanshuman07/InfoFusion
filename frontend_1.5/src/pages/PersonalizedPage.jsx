import React, { useState } from 'react'
import styled from 'styled-components';
import { Box, TextField, MenuItem, Typography} from "@mui/material";
import NewsTile from "../components/NewsTile";
import { newsCategories } from "../utils/newsCategories";
import LinearProgress from '@mui/material/LinearProgress';
const PersonalizedPage = () => {
  const [personalizedUrl, setPersonalizedUrl] = useState("");
  const [category, setCategory] = useState("Category")
  const [loading, setLoading] = useState(true);
  const handleAddPreferrences = (category) => {
    const prefUrl = `https://newsapi.org/v2/top-headlines?country=IN&category=${category}&apiKey=63ad2b1e940942df92a9bec4373642e3`;
    setPersonalizedUrl(prefUrl);
    setLoading(false);
  }
  return (
    <Root>
      <Box className='personalized-box'>
        <Box className='category'>
          <TextField
            name="category"
            variant="outlined"
            fullWidth
            size="small"
            value={category}
            label='Category'
            placeholder="Category"
            onChange={(e) => {setCategory(e.target.value); handleAddPreferrences(e.target.value)}}
            select
          >
            {newsCategories.map((category) => {
              return (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              )
            })}
          </TextField>
        </Box>
      </Box>
      {loading ? <LinearProgress className='progress-bar' color="inherit"/> : <NewsTile url={personalizedUrl} />}
      {loading ? <Box className='choose-category'>
        <Typography className='category-desc'>Set your category preferrence to read personallized news shorts !</Typography>
      </Box>: ""}
    </Root>
  )
}

const Root = styled.div`
display: flex;
flex-direction: column;
  .personalized-box{
    display: flex;
    margin-bottom: 10px;
    padding: 20px 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 5px;
    min-width: 600px;
    min-height: 50px;
    color: #045350;
    justify-content: space-between;
  }
  .category{
    display: flex;
    width: 100%;
    margin-right: 10px;
    margin-left: 10px;
    justify-content
  }
  .makeurl{
    width: 10%;
    margin-left: 25px;
  }
  .makeurl-btn{
    width: 90%;
    font-weight: bold;
    background-color: white;
    border: 1px solid #063d40;
    color: #063d40;
    text-transform: none;
    &:hover {
      background-color: #063d40;
      color: whitesmoke;
      border: 1px solid #063d40;
    }
  }
  .country-label{
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 150px;
    color: #063d40;
  }
  .category-label{
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 150px;
    color: #063d40;
  }
  .progress-bar{
    color: #063d40;
    margin-top: 1%;
  }
  .choose-category{
    margin: 100px auto;
    background-color: #063d40;
    padding: 10px;
    border-radius: 40px;
  }
  .category-desc{
    color: white;
    font-weight: bold;
    padding: 10px;
  }
`;

export default PersonalizedPage;

