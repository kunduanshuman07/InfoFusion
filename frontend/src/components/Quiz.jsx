import React, { useState, useEffect } from 'react'
import { Box, Button, List, ListItem, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import styled from 'styled-components';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ScoreCard from './ScoreCard';
import { ratingAlgorithm } from '../utils/RatingAlgo';
import CloseIcon from "@mui/icons-material/Close";
const Quiz = ({ questions, quizId, setOpenQuizModal }) => {
  const [timeLeft, setTimeLeft] = useState(1200);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const questionsLength = questions.length;
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [easyCount, setEasyCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [miscCount, setMiscCount] = useState(0);
  const [incEasy, setIncEasy] = useState(0);
  const [incMedium, setIncMedium] = useState(0);
  const [incHard, setIncHard] = useState(0);
  const [incMisc, setIncMisc] = useState(0);
  const [IQR, setIQR] = useState(0);
  useEffect(() => {
    if (!timeLeft) setShowScore(true);

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  useEffect(() => {
    if (showScore) {
      const iqr = ratingAlgorithm(easyCount, mediumCount, hardCount, miscCount, score, incEasy, incMedium, incHard, incMisc);
      localStorage.setItem("useriqr", JSON.stringify(iqr));
      console.log(iqr);
      setIQR(iqr);
    }
  }, [showScore, easyCount, mediumCount, hardCount, miscCount, score, incEasy, incMedium, incHard, incMisc]);
  const handleAnswerButtonClick = (isCorrect, questionAttempted, correctOption, selectedOption, questionType) => {
    if (isCorrect) {
      if (questionType === '1') {
        setEasyCount(easyCount + 1);
      }
      else if (questionType === '2') {
        setMediumCount(mediumCount + 1);
      }
      else if (questionType === '3') {
        setHardCount(hardCount + 1);
      }
      else if (questionType === '4') {
        setMiscCount(miscCount + 1);
      }
      setScore(score + 1);
    }
    else {
      if (questionType === '1') {
        setIncEasy(incEasy + 1);
      }
      else if (questionType === '2') {
        setIncMedium(incMedium + 1);
      }
      else if (questionType === '3') {
        setIncHard(incHard + 1);
      }
      else if (questionType === '4') {
        setIncMisc(incMisc + 1);
      }
    }
    const attempt = {
      question: questionAttempted,
      yourAnswer: selectedOption,
      correctOption: correctOption,
      type: questionType,
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
  const getCategoryLabel = (type) => {
    switch (type) {
      case '1':
        return 'Easy';
      case '2':
        return 'Medium';
      case '3':
        return 'Hard';
      case '4':
        return 'Misc';
      default:
        return 'Unknown';
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
    <>
      {showScore ? (
        <ScoreCard score={score} iqr={IQR} quizId={quizId} questionsLength={questionsLength} attemptedQuestions={attemptedQuestions} setShowScore={setShowScore} callFrom='Past'/>
      ) : (
        <>
          <Dialog open={true} fullScreen>
            <DialogTitle
              sx={{
                display: "flex",
                backgroundColor: "#086D67",
                fontSize: "19px",
                fontWeight: "bolder",
                height: "70px",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Box>
                <Typography style={{ color: "white", margin: "auto", fontWeight: "bolder" }}>Quiz Date : 30-12-2023
                </Typography>
              </Box>
              <Box className='timer' style={{display: "flex", }}>
                <Box style={{marginLeft: "340px", fontWeight: "bold"}}>
                  <IconButton style={{color: "white"}}>
                    <AccessAlarmIcon fontSize='medium' className='timer-icon' />
                  </IconButton>
                </Box>
                <Box>
                  <Typography style={{color: "white", marginTop: "8px", }}>{minutes.toString().padStart(2, '0')} mins : {seconds.toString().padStart(2, '0')} secs</Typography>
                </Box>
                <CloseIcon className="close-icon" style={{ color: 'white', cursor: "pointer", marginTop: "8px" , marginLeft: "500px" }} />
              </Box>
              
            </DialogTitle>
            <DialogContent>
              <Root>
                <Box className='container'>
                  <Box className='question-box'>
                    <Typography className='question-info'>
                      <h3>Question No. {currentQuestion + 1}: </h3>
                      <Button style={{ backgroundColor: '#086D67', color: "white", fontSize: "13px", fontWeight: "bold", borderRadius: "10px" }}>Category : {getCategoryLabel(questions[currentQuestion].type)}</Button>
                      <h2>{questions[currentQuestion].questionText}</h2>
                    </Typography>
                  </Box>
                  <Box className='option-box'>
                    <List className='option-list'>
                      {questions[currentQuestion].options.map((option, index) => (
                        <ListItem key={index} className='option'>
                          <Button className='option-btn' variant='outlined' onClick={() => handleAnswerButtonClick(option.isCorrect, questions[currentQuestion], findCorrectOption(questions[currentQuestion].options), option.optionText, questions[currentQuestion].type)}>
                            {option.optionText}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Root>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}


const Root = styled.div`    
    .timer{
      color: white;
      display:flex;
      flex-direction: row;
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
    cursor: pointer;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
  }
  .question-box{
    background-color: white;
    padding: 5px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
    border: 2px solid #ddd;
    border-radius: 10px;
    cursor: pointer;
    border-radius: 10px;
  }
  .question-info{
    color: #086D67;
    padding: 5px;
  }
  .option-box{
    margin-top: 50px;
    border-radius: 5px;
    width: 60%;
    border: 2px solid #ddd;
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
    font-weight: bold;
    min-width: 150px;
    max-width: 150px;
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
    color: white
  }
`;

export default Quiz

