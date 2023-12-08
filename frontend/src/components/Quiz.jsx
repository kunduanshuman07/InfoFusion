import React, { useState } from 'react'
import { questions } from '../data/questions';
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);
    };
    const handleNextQuestion = () => {
        if (
            answers[currentQuestion] === questions[currentQuestion].answer ||
            JSON.stringify(answers[currentQuestion]) ===
            JSON.stringify(questions[currentQuestion].answer)
        ) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };
    return (
        <Root>
            {showScore ? (
                <Box>
                    <Typography className='question-no'>Quiz Complete!</Typography>
                    <Typography className='question-det'>Your Score: {score}</Typography>
                </Box>
            ) : (
                <Box>
                    <Typography className='question-no'>Question No. {currentQuestion + 1} :</Typography>
                    <Typography className='question-det'>{questions[currentQuestion].question}</Typography>
                    <Box className="ques-box">
                        {questions[currentQuestion].type === 'radio' && (
                            <List>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <ListItem key={index}>
                                        <input
                                            type="radio"
                                            name={`question${currentQuestion}`}
                                            value={option}
                                            onChange={() =>
                                                handleAnswerSelection(currentQuestion, option)
                                            }
                                        />
                                        {option}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {questions[currentQuestion].type === 'checkbox' && (
                            <List>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <ListItem key={index}>
                                        <input
                                            type="checkbox"
                                            name={`question${currentQuestion}`}
                                            value={option}
                                            onChange={() =>
                                                handleAnswerSelection(currentQuestion, option)
                                            }
                                        />
                                        {option}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {questions[currentQuestion].type === 'input' && (
                            <TextField
                                size='small'
                                onChange={(e) =>
                                    handleAnswerSelection(currentQuestion, e.target.value)
                                }
                            />
                        )}
                        {questions[currentQuestion].type === 'textarea' && (
                            <TextField
                                fullWidth
                                onChange={(e) =>
                                    handleAnswerSelection(currentQuestion, e.target.value)
                                }
                            />
                        )}
                    </Box>
                    <Box className='btn-box'>
                        <Button variant='contained' className='quiz-btn' onClick={handleNextQuestion}>Next Question</Button>
                    </Box>
                </Box>
            )}
        </Root>
    );
}


const Root = styled.div`
    padding: 10px;
    border: 5px solid #086D67;
    .btn-box{
        margin-top: 5px;
    }
    .quiz-btn{
        background-color: "086D67;
        text-transform: none;
        margin-top: 10px;
        &:hover {
            background-color: #045350;
        }
    }
    .question-no{
        font-weight: bold;
    }
    .question-det{

    }
`;

export default Quiz