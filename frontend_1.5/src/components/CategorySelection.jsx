import React, { useState } from 'react';
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import styled from 'styled-components';
import { newsCategories } from "../utils/newsCategories";
import { trendingData } from '../utils/TrendingDebateTopics';
import { Card } from '@mui/material';
import ChatRoom from './ChatRoom';
import LinearProgress from '@mui/material/LinearProgress';
const CategorySelection = () => {
  const [category, setCategory] = useState("");
  const [chatRoom, setChatRoom] = useState(false);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleChatRoom = () => {
    if(category){
      setChatRoom(true);
    }
  }
  return (
    <Box style={{ marginTop: "10px", position: 'relative' }}>
      {!chatRoom ? <Box>
        <Root style={{ filter: category === "" ? 'blur(5px)' : 'none' }}>
          {trendingData.map((card, index) => (
            <Card key={index} className='card' onClick={handleChatRoom}>
              <Typography>{card.text}</Typography>
            </Card>
          ))}
        </Root>

        {!category && (
          <Box
            style={{
              backgroundColor: "#0a686e",
              color: "white",
              padding: "20px",
              borderRadius: "20px",
              textAlign: 'center',
              fontWeight: 'bolder',
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <LinearProgress color="inherit" style={{ marginBottom: "10px" }} />
            Select a category to view trending topics for Debate!
            <Box style={{backgroundColor: "white", borderRadius: "10px", marginTop: "10px", padding: "10px"}}>
              <TextField
                name="category"
                variant="outlined"
                fullWidth
                size="small"
                label='Select a Category to enter Debate Room'
                placeholder="Select a Category to enter Debate Room"
                onChange={handleCategoryChange}
                select
                style={{border: "0px"}}
              >
                {newsCategories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        )}
      </Box> : <ChatRoom category={category} />}
    </Box>
  );
};

const Root = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  .card {
    cursor: pointer;
    border: 2px solid #ddd;
    border-radius: 10px;
    background-color: white;
    color: #0a686e;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }
`;

export default CategorySelection;
