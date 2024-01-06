import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import styled from 'styled-components';
const QuizForm = () => {
  const [quizData, setQuizData] = useState({
    questions: [
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
        ],
        type: '',
      },
    ],
  });

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;

    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex][field] = value;

    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  const submitQuiz = async () => {
    const data = await axios.post('http://localhost:3000/quiz/quiz-add-admin', quizData);
    console.log(data);
  };

  return (
    <Root>
      <form className='form-box'>

        {quizData.questions.map((question, questionIndex) => (
          <Box key={questionIndex} className='questions-box'>
            <InputLabel htmlFor={`questionText${questionIndex}`} className='label'>Question {questionIndex + 1}</InputLabel>
            <TextField
              type="text"
              fullWidth
              id={`questionText${questionIndex}`}
              name={`questionText${questionIndex}`}
              value={question.questionText}
              onChange={(e) => handleInputChange(questionIndex, 'questionText', e.target.value)}
            />

            <InputLabel className='label'>Options List: </InputLabel>
            {question.options.map((option, optionIndex) => (
              <Box key={optionIndex} className='options-box'>
                <InputLabel htmlFor={`optionText${questionIndex}_${optionIndex}`} className='label'>Option {optionIndex + 1}</InputLabel>
                <TextField
                  type="text"
                  fullWidth
                  id={`optionText${questionIndex}_${optionIndex}`}
                  name={`optionText${questionIndex}_${optionIndex}`}
                  value={option.optionText}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'optionText', e.target.value)}
                />

                <InputLabel htmlFor={`isCorrect${questionIndex}_${optionIndex}`} className='label'>Is Correct</InputLabel>
                <input
                  type="radio"
                  className='radio'
                  id={`isCorrect${questionIndex}_${optionIndex}`}
                  name={`isCorrect${questionIndex}_${optionIndex}`}
                  checked={option.isCorrect}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'isCorrect', e.target.checked)}
                />
              </Box>
            ))}
            <InputLabel className='label'>Question Type (Write 1 for E, 2 for M, 3 for H & 4 for Misc): </InputLabel>
            <TextField
              fullWidth
              id={`type${questionIndex}`}
              name={`type${questionIndex}`}
              value={question.type}
              onChange={(e) => handleInputChange(questionIndex, 'type', e.target.value)}
            />
          </Box>
        ))}

        <Button onClick={submitQuiz} className='submit-btn' variant='outlined'>
          Submit
        </Button>
      </form>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  .form-box{
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: auto;
    width: 80%;
  }
  .label{
    font-weight: bold;
    font-size: 18px;
    margin: 10px;
  }
  .submit-btn{
    color: #086D67;
  }
  .questions-box{
    border: 3px solid #086D67;
    padding: 20px;
    border-radius: 5px;
    margin: 2px;
  }
  .options-box{
    border: 1px solid #086D67;
    padding: 10px;
    margin: 3px;
  }
`;
export default QuizForm;
