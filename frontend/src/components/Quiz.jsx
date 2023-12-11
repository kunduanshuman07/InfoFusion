import React, { useState } from 'react'
import { questions } from '../data/questions';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import styled from 'styled-components';
const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect) {
          setScore(score + 1);
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
      };
    return (
        <Root>
            {showScore ? (
                <Box className='container'>
                    <Typography className='question-no'>Quiz Complete!</Typography>
                    <Typography className='question-det'>Your Score: {score}</Typography>
                </Box>
            ) : (
                <Box className='container'>
                    <Box className='question-box'>
                        <Typography className='question-info'>
                            <h3>Question No. {currentQuestion + 1} :</h3>
                            <h2>{questions[currentQuestion].question}</h2>
                        </Typography>
                    </Box>
                    <Box className='option-box'>
                        <List className='option-list'>
                            {questions[currentQuestion].options.map((option, index) => (
                                <ListItem key={index} className='option'>
                                    <Button className='option-btn' variant='outlined' onClick={() => handleAnswerButtonClick(option === questions[currentQuestion].answer)}>
                                        {option}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            )}
        </Root>
    );
}


const Root = styled.div`
    margin-top: 50px;
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
`;

export default Quiz