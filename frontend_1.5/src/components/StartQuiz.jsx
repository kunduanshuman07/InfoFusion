import React, { useState, useEffect, useCallback } from 'react'
import { Button, Box, Typography, IconButton, Avatar} from '@mui/material';
import styled from 'styled-components';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { DataGrid } from "@mui/x-data-grid";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { useNavigate } from "react-router-dom";
import QuizChoices from './QuizChoices';
import PastQuizzes from './PastQuizzes';
const StartQuiz = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([]);
  const [isQuizEnabled, setIsQuizEnabled] = useState(true);
  const [quizSelection, setQuizSelection] = useState(true);
  const [quizChoice, setQuizChoice] = useState("Today");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/playground/score-cards');
  }
  const handleQuizChoiceSelection = (choice) =>{
    setQuizChoice(choice);
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
      <QuizChoices setQuizSelection={setQuizSelection} handleQuizChoiceSelection={handleQuizChoiceSelection}/>
      {quizChoice==="Today" && <Box className='container' style={{ filter: !quizSelection ? 'blur(5px)' :'none' }}>
        <Box className='quiz-box'>
          <IconButton>
            <Avatar alt={user.name} src={`http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style' />
          </IconButton>
          <Box className='greet'>
            <Typography variant='h6' style={{backgroundColor: "#0a686e", color: "white", borderRadius: "20px", padding: "10px", paddingTop: "10px", fontSize: "15px", fontWeight: "bold"}}>Hi, {user.name} !</Typography>
            {isQuizEnabled === false ? <Typography variant='h6' style={{ color: "red", marginTop: "25px", fontSize: "13px", fontWeight: "bold" }}>You have already given today's quiz!</Typography>:<Button className='start-quiz' variant='outlined' onClick={handleStartQuiz} disabled={!isQuizEnabled}>
            Start the quiz
          </Button>}
            
            <h3 style={{ color: "purple" }}>Next Quiz starts in</h3>
          </Box>
          <Box className='timer'>
            <AccessAlarmIcon fontSize='medium' className='timer-icon' />
            <h3>{formatTime(timeRemaining)}</h3>
          </Box>
          <Button variant='contained' startIcon={<SportsScoreIcon />} className='scorecards-btn' onClick={handleClick}>Scorecards</Button>
        </Box>
        <Box className='leaderboard-box'>
          <Button variant='outlined' className='leaderboard-btn'>Today's Quiz Leaderboard <EmojiEventsIcon style={{ color: "#d4af37", marginLeft: "5px" }} /></Button>
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
      </Box>}
      {quizChoice === 'Past' && <PastQuizzes/>}
    </Root>
  )
}
const Root = styled.div`
  padding: 20px;
  background-color: #0a686e;
  margin-top: -10px;
  border-radius: 20px;
  margin: auto;
  overflow: hidden;
  .container {
    margin-top: -10px;
    display: flex;
    justify-content: center;
  }
  .quiz-box{
    background-color: white;
    padding: 10px;
    width: 50%;
    min-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
  }
  .leaderboard-box{
    padding: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    border-radius: 20px;
    background-color: white;
    display:flex;
    margin-left: 20px;
    flex-direction: column;
    width: 50%;
    max-width: 50%;
    margin-top: 10px;
  }
  .leaderboard-btn{
     margin-top: 10px;
     margin-bottom: 10px;
     margin-left: 20px;
     padding: 0px;
     width: 90%;
     text-transform: none;
     color: #0a686e;
     font-weight: 600;
     background-color: #0a686e;
     color: whitesmoke;
     box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
     &:hover {
      background-color: #0a686e;
      color: whitesmoke;
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .scorecards-btn{
    margin-top: 10px;
    margin-bottom: auto;
    background-color: #0a686e;
    color: white;
    width: 40%;
    padding: 0px;
    margin-left: 5px;
    margin-right: 5px;
    text-transform: none;
    font-weight: bold;
    &:hover{
      background-color: white;
      color: #0a686e;
    }
  }
  .greet {
    color: #0a686e;
    margin-bottom: -20px;
  }

  .avatar-style {
    margin-bottom: 0px;
    background-color: #0a686e;
    color: whitesmoke;
  }

  .start-quiz {
    color: #0a686e;
    margin-top: 10px;
    font-weight: bold;
    &:hover {
      background-color: #0a686e;
      color: whitesmoke;
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .timer{
    color: #0a686e;
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
    background-color: #0a686e;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0;
  }
`;
export default StartQuiz