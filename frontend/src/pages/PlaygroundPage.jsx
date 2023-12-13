import React, { useState, useEffect, useCallback } from 'react';
import Quiz from '../components/Quiz';
import { Button, Box, Typography, IconButton, Avatar } from '@mui/material';
import styled from 'styled-components';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import axios from "axios";

const PlaygroundPage = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState();
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quiz/latest-quiz');
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

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
  const user = JSON.parse(localStorage.getItem('user'));

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
    <>
      {startQuiz ? <Quiz questions={questions}/> : <Root>
        <Box className='container'>
          <IconButton>
            <Avatar alt={user.name} src='avatar' className='avatar-style' />
          </IconButton>
          <Typography className='greet'>
            <h2>Hi {user.name} !</h2>
            <h4>Next Quiz starts in</h4>
          </Typography>
          <Box className='timer'>
            <AccessAlarmIcon fontSize='medium' className='timer-icon' />
            <h3>{formatTime(timeRemaining)}</h3>
          </Box>
          <Button className='start-quiz' variant='outlined' onClick={() => setStartQuiz(true)}>
            Start the quiz
          </Button>
        </Box>
      </Root>}

    </>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    border-radius: 5px;
    padding: 20px;
    text-align: center;
  }

  .greet {
    color: #086d67;
    margin-bottom: 0px;
  }

  .avatar-style {
    margin-bottom: 0px;
    background-color: #086d67;
    color: whitesmoke;
  }

  .start-quiz {
    color: #086d67;
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
`;

export default PlaygroundPage;
