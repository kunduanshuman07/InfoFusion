import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppBarComponent from '../components/AppBar';
import { Box, Grid, IconButton, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import axios from "axios";
import { LineChart } from '@mui/x-charts/LineChart';
const QuizDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rating, setRating] = useState(100);
  const [quizCount, setQuizCount] = useState(0);
  const [highestRating, setHighestRating] = useState(100);
  const [maxiqr, setMaxiqr] = useState(0);
  const [iqrRow, setIqrRow] = useState([]);
  const [seriesRow, setSeriesRow] = useState([]);
  const [overallRatingRow, setOverallRatingRow] = useState([]);
  const [overallRatingSeries, setOverallRatingSeries] = useState([]);
  useEffect(() => {
    const xAxisData = user.quizzes.map((quiz, index) => index + 1);
    const seriesData = user.quizzes.map(quiz => quiz.rating);
    const overallRatingdata = user.quizzes.map(quiz => quiz.overallRating);
    setIqrRow(xAxisData);
    setSeriesRow(seriesData);
    setOverallRatingRow(xAxisData);
    setOverallRatingSeries(overallRatingdata);
    const fetchDashboard = async () => {
      const userData = {
        userId: user._id
      }
      const { data, status } = await axios.post('http://localhost:3000/user/user-dashboard', userData);
      if (status === 200) {
        setRating(data.dashboardData.rating);
        setQuizCount(data.dashboardData.quizcount);
        setHighestRating(data.dashboardData.maxRating);
        setMaxiqr(data.dashboardData.maxiqr);
      }
    }
    fetchDashboard();
  }, [])
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
                <h4 style={{ color: "#086D67" }}>{user.name}</h4>
                <h5 style={{ color: "#086D67", marginBottom: "10px" }}>Username: {user.username}</h5>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className='grids'>
              <Box className='rank-box'>
                <EmojiEventsIcon className='trophy-icon' />
              </Box>
              <Box className='rank-info'>
                <h2>Rating: {rating}</h2>
                <h3>Highest Rating: {highestRating}</h3>
                <h4>Max IQR: {maxiqr}</h4>
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
              <Box className='iqr-graph'>
                <LineChart
                  xAxis={[{ data: iqrRow }]}
                  series={[
                    {
                      data: seriesRow,
                      label: "Individual Quiz Rating",
                      color: "#7d37a1"
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className='grids'>
              <Box className='quiz-box'>
                <VideogameAssetIcon className='quiz-icon' />
              </Box>
              <Box className='quiz-info'>
                <h4>Solved questions: 800</h4>
                <h4>Correct Answers: 700</h4>
                <h4>Correct Misc + Hard: 150</h4>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className='grids'>
              <Box className='overallrating-graph'>
                <LineChart
                  xAxis={[{ data: overallRatingRow }]}
                  series={[
                    {
                      data: overallRatingSeries,
                      label: "Rating",
                      color: 'Red',
                    },
                  ]}
                  width={400}
                  height={200}
                />
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
    padding: 0px;
    min-width: 300px;
    min-height: 200px;
    border-radius: 10px;
    margin-left: 4px;
    margin-right: 18px;
    border: 2px solid #ddd;
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
    font-size: 60px;
    margin-top: 80%;
    margin-left: 10px;
  }
  .streak-icon{
    color: #eb6e2f;
    font-size: 60px;
    margin-top: 80%;
    margin-left: 10px;
  }
  .quiz-icon{
    color: #310261;
    font-size: 60px;
    margin-top: 80%;
    margin-left: 10px;
  }
`;

export default QuizDashboard;
