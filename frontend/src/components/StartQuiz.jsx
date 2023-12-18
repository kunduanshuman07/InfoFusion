import React, { useState, useEffect, useCallback } from 'react'
import { Button, Box, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import styled from 'styled-components';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { DataGrid } from "@mui/x-data-grid";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { useNavigate } from "react-router-dom";
const StartQuiz = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([]);
  const [isQuizEnabled, setIsQuizEnabled] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/score-cards');
  }
  useEffect(() => {
    const isQuizIdPresent = user.quizzes.some((quiz) => quiz.quizId === props.quizId);
    setIsQuizEnabled(!isQuizIdPresent);
    const formattedRows = props.rows.map((item, index) => ({
      id: index,
      rank: index + 1,
      username: item.username,
      iqr: item.iqr,
    }),
    );
    setRows(formattedRows);
  }, [rows]);
  const columns = [
    {

      field: "rank",
      headerName: "Rank",
      flex: 0,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {

      field: "username",
      headerName: "Username",
      flex: 0.5,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "iqr",
      headerName: "IQR",
      flex: 0,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },

  ]
  // const rows = [
  //   {
  //     id: 0,
  //   },
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 3,
  //   },
  // ]
  const handleStartQuiz = () => {
    props.setStartQuiz(true);
  }

  const getTimeRemainingUntilNextDay = useCallback(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);

    const timeDiff = tomorrow.getTime() - now.getTime();
    const secondsRemaining = Math.floor(timeDiff / 1000);

    return secondsRemaining;
  }, []);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemainingUntilNextDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemainingUntilNextDay());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} hrs : ${String(minutes).padStart(2, '0')} mins : ${String(remainingSeconds).padStart(2, '0')} secs`;
  }
  return (
    <Root>
      <Box className='container'>
        <Box className='quiz-box'>
          <IconButton>
            <Avatar alt={user.name} src='avatar' className='avatar-style' />
          </IconButton>
          <Typography className='greet'>
            <h2>Hi {user.name} !</h2>
            {isQuizEnabled === false && <h4 style={{ color: "red" }}>"You have already given today's quiz!"</h4>}
            <h3 style={{ color: "purple" }}>Next Quiz starts in</h3>
          </Typography>
          <Box className='timer'>
            <AccessAlarmIcon fontSize='medium' className='timer-icon' />
            <h3>{formatTime(timeRemaining)}</h3>
          </Box>
          <Button className='start-quiz' variant='outlined' onClick={handleStartQuiz} disabled={!isQuizEnabled}>
            Start the quiz
          </Button>
        </Box>
        <Button variant='outlined' startIcon={<SportsScoreIcon />} className='scorecards-btn' onClick={handleClick}>Scorecards</Button>
        <Box className='leaderboard-box'>
          <Button variant='outlined' className='leaderboard-btn'>Current Quiz Leaderboard <EmojiEventsIcon style={{ color: "#d4af37", marginLeft: "5px" }} /></Button>
          <Box className='data-grid'>
            <DataGrid
              sx={{ border: "0px" }}
              rows={rows}
              columns={columns}
              paginationModel={{ pageSize: 5, page: 0 }}
              disableRowSelectionOnClick
              disableColumnMenu
              hideFooter
            />
          </Box>
        </Box>
      </Box>
    </Root>
  )
}
const Root = styled.div`
  padding: 10px;
  .container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .quiz-box{
    width: 40%;
    min-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    border-radius: 5px;
    border-right: 2px solid #086D67;
    border-left: 2px solid #086D67;
    padding: 20px;
    text-align: center;
  }
  .leaderboard-box{
    border-left: 2px solid #086D67;
    border-right: 2px solid #086D67;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    width: 45%;
    max-width: 45%;
    margin-top: 10px;
  }
  .leaderboard-btn{
     margin-top: 10px;
     margin-bottom: 10px;
     margin-left: 20px;
     padding: 0px;
     width: 90%;
     text-transform: none;
     color: #086D67;
     font-weight: 600;
     background-color: #086d67;
     color: whitesmoke;
     box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
     &:hover {
      background-color: #086d67;
      color: whitesmoke;
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .scorecards-btn{
    margin-top: auto;
    margin-bottom: auto;
    width: 20%;
    height: 30%;
    padding: 0px;
    margin-left: 5px;
    margin-right: 5px;
    color: #086D67;
    text-transform: none;
    font-weight: bold;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
  }
  .greet {
    color: #086d67;
    margin-bottom: -20px;
  }

  .avatar-style {
    margin-bottom: 0px;
    background-color: #086d67;
    color: whitesmoke;
  }

  .start-quiz {
    color: #086d67;
    font-weight: bold;
    &:hover {
      background-color: #086d67;
      color: whitesmoke;
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .timer{
    color: #086d67;
    display:flex;
    flex-direction:row;
  }
  .timer-icon{
    margin-top: 20px;
    margin-right: 10px;
  }
  .trophy-icon {
    color: #d4af37;
    font-size: 40px;
    margin-top: 40px;
    margin-left: 10px;
  }
  .mytableheader{
    background-color: #086D67;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0;
  }
`;
export default StartQuiz