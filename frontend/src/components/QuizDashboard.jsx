import React from 'react';
import styled from 'styled-components';
import AppBarComponent from '../components/AppBar';
import { Box, Grid, IconButton, Avatar} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import StarIcon from '@mui/icons-material/Star';
import CalendarHeatmapComponent from './CalendarHeatmapComponent';
const QuizDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Root>
      <AppBarComponent comp={'profile'} />
      <Box className='grid-container'>
        <Grid container spacing={1}>
          {/* First Row */}
          <Grid item xs={3}>
            <Box className='grids'>
              <Box className='profile-box'>
                <IconButton>
                  <Avatar alt={user.name} src='avatar' className='avatar-style' />
                </IconButton>
                <h4>{user.name}</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className='grids'>
              <Box className='rank-box'>
                <EmojiEventsIcon className='trophy-icon' />
              </Box>
              <Box className='rank-info'>
                <h3>Overall Rank: 14</h3>
                <h4>Weekly Rank: 3</h4>
                <h4>Monthly Rank: 10</h4>
                <h4>Highest Rank: 3</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className='grids'>
              <Box className='streak-box'>
                <WhatshotIcon className='streak-icon' />
              </Box>
              <Box className='streak-info'>
                <h3>Current streak: 9</h3>
                <h4>Max streak: 10</h4>
              </Box>
            </Box>
          </Grid>
          {/* Second Row */}
          <Grid item xs={4}>
            <Box className='grids'>
              <Box className='quiz-box'>
                <VideogameAssetIcon className='quiz-icon' />
              </Box>
              <Box className='quiz-info'>
                <h3>Quiz count: 109</h3>
                <h4>Solved questions: 800</h4>
                <h4>Correct Answers: 700</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className='grids'>
              <Box className='best-box'>
                <StarIcon className='best-icon' />
              </Box>
              <Box className='best-info'>
                <h3>Best quiz rank: 3</h3>
                <h4>9/10 count: 90</h4>
                <h4>10/10 count: 109</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className='grids'>
              <Box className='heatmap'>
                <CalendarHeatmapComponent />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  .grid-container {
    display: flex;
    margin-top: 100px;
  }
  .grids {
    display: flex;
    padding: 10px;
    min-width: 300px;
    min-height: 200px;
    border-radius: 5px;
    margin-left: 4px;
    margin-right: 18px;
    border-left: 2px solid #086D67;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.15);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .rank-info{
    margin: auto;
    color: #086D67;
    text-align: center;
    margin-left: 150px;
  }
  .streak-info{
    margin: auto;
    color: #086D67;
    text-align: center;
  }
  .quiz-info{
    margin: auto;
    color: #086D67;
    text-align: center;
  }
  .best-info{
    margin: auto;
    color: #086D67;
    text-align: center;
    margin-left: 60px;
  }
  .heatmap{
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    height: 90%;
  }
  .profile-box {
    margin: auto;
    text-align: center;
  }
  .avatar-style {
    background-color: #086d67;
    color: white;
  }
  .trophy-icon {
    color: #d4af37;
    font-size: 70px;
    margin-top: 40px;
    margin-left: 10px;
  }
  .streak-icon{
    color: #eb6e2f;
    font-size: 60px;
    margin-top: 60px;
    margin-left: 10px;
  }
  .quiz-icon{
    color: #310261;
    font-size: 60px;
    margin-top: 60px;
    margin-left: 10px;
  }
  .best-icon{
    color: #65962d;
    font-size: 60px;
    margin-top: 60px;
    margin-left: 10px;
  }
`;

export default QuizDashboard;
