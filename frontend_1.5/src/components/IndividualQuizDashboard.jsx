import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppBarComponent from '../components/AppBar';
import { Box, Grid, IconButton, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import axios from "axios";
import { LineChart } from '@mui/x-charts/LineChart';
const IndividualQuizDashboard = ({userid}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [rating, setRating] = useState(100);
  const [quizCount, setQuizCount] = useState(0);
  const [highestRating, setHighestRating] = useState(100);
  const [maxiqr, setMaxiqr] = useState(0);
  const [iqrRow, setIqrRow] = useState([]);
  const [seriesRow, setSeriesRow] = useState([]);
  const [overallRatingRow, setOverallRatingRow] = useState([]);
  const [overallRatingSeries, setOverallRatingSeries] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hardAnswers, setHardAnswers] = useState(0);
  const [miscAnswers, setMiscAnswers] = useState(0);
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
        userId: userid
      }
      const { data, status } = await axios.post('http://localhost:3000/user/user-dashboard', userData);
      if (status === 200) {
        console.log(data);
        setRating(data.dashboardData.rating);
        setQuizCount(data.dashboardData.quizcount);
        setHighestRating(data.dashboardData.maxRating);
        setMaxiqr(data.dashboardData.maxiqr);
        setCorrectAnswers(data.dashboardData.correctAnswers);
        setHardAnswers(data.dashboardData.hardAnswers);
        setMiscAnswers(data.dashboardData.miscAnswers);
        setSolvedQuestions(data.dashboardData.solvedQuestions);
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
                  <Avatar alt={user.name} src={`http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style' />
                </IconButton>
                <h5 style={{ color: "#0a686e" }}>{user.name}</h5>
                <h4 style={{ color: "#0a686e", marginBottom: "0px" }}>Quiz attempts: {quizCount}</h4>
                <h5 style={{ color: "#0a686e", marginBottom: "0px" }}>Username: {user.username}</h5>
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
                <h4>Solved questions: {solvedQuestions}</h4>
                <h4>Correct Answers: {correctAnswers}</h4>
                <h4>Correct Hard: {hardAnswers}</h4>
                <h4>Correct Miscellaneous: {miscAnswers}</h4>
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
    color: #0a686e;
    text-align: left;
    margin-left: 100px;
  }
  .streak-info{
    margin: auto;
    color: #0a686e;
    text-align: center;
  }
  .quiz-info{
    margin: auto;
    color: #0a686e;
    text-align: left;
  }
  .profile-box {
    margin: 0px auto;
    text-align: center;
  }
  .avatar-style {
    background-color: #0a686e;
    color: white;
    margin-top: 2px;
  }
  .trophy-icon {
    color: #d4af37;
    font-size: 100px;
    margin-top: 25%;
    margin-left: 80px;
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
    margin-left: 30px;
  }
`;

export default IndividualQuizDashboard;
