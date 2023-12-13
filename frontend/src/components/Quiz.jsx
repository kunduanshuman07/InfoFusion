import React, { useState, useEffect } from 'react'
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import styled from 'styled-components';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ScoreCard from './ScoreCard';
const Quiz = ({ questions, quizId }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const questionsLength = questions.length;
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);

  useEffect(() => {
    if (!timeLeft) setShowScore(true);

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const handleAnswerButtonClick = (isCorrect, questionAttempted, correctOption, selectedOption) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const attempt = {
      question: questionAttempted,
      yourAnswer: selectedOption,
      correctOption: correctOption,
      points: isCorrect ? 1 : 0,
    }
    setAttemptedQuestions((prevAttempts) => [...prevAttempts, attempt]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  useEffect(() => {
    console.log(attemptedQuestions);
  }, [attemptedQuestions]);
  const findCorrectOption = (options) => {
    const optionArray = Object.values(options);
    return optionArray.find((option) => option.isCorrect);
  };
  return (
    <Root>
      {showScore ? (
        <ScoreCard score={score} quizId={quizId} questionsLength={questionsLength} attemptedQuestions={attemptedQuestions}/>
      ) : (
        <>
          <Box className='timer'>
            <AccessAlarmIcon fontSize='medium' className='timer-icon' />
            <h3>{minutes.toString().padStart(2, '0')} mins : {seconds.toString().padStart(2, '0')} secs</h3>
          </Box>
          <Box className='container'>
            <Box className='question-box'>
              <Typography className='question-info'>
                <h3>Question No. {currentQuestion + 1} :</h3>
                <h2>{questions[currentQuestion].questionText}</h2>
              </Typography>
            </Box>
            <Box className='option-box'>
              <List className='option-list'>
                {questions[currentQuestion].options.map((option, index) => (
                  <ListItem key={index} className='option'>
                    <Button className='option-btn' variant='outlined' onClick={() => handleAnswerButtonClick(option.isCorrect, questions[currentQuestion], findCorrectOption(questions[currentQuestion].options), option.optionText)}>
                      {option.optionText}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </>
      )}
    </Root>
  );
}


const Root = styled.div`
    margin-top: 10px;
    .timer{
      color: #086d67;
      display:flex;
      flex-direction:row;
      padding: 10px;
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
      cursor: pointer;
      border-left: 2px solid #086D67;
      border-radius: 5px;
      padding: 20px;
      text-align: center;
      width: 40%;
      margin: auto;
      margin-bottom: 10px;
    }
  .container{
    padding: 10px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    &:hover {
        box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    border-left: 2px solid #086D67;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
  }
  .question-box{
    background-color: #086D67;
    padding: 5px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    cursor: pointer;
    border-radius: 10px;
  }
  .question-info{
    color: whitesmoke;
  }
  .option-box{
    margin-top: 20px;
    border-radius: 5px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .option-list{
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .option-btn{
    color: #086D67;
    &:hover {
        background-color: #086D67;
        color: whitesmoke;
        box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .complete{
    font-size: 25px;
    font-weight: bold;
    color: #086D67;
    text-decoration: underline;
  }
  .score{
    font-size: 35px;
    font-weight: bolder;
    color: #086F67;
  }
  .timer-icon{
    margin-top: 20px;
    margin-right: 30px;
    margin-left: 40px;
  }
`;

export default Quiz