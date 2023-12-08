import React, { useState } from 'react'
import Quiz from '../components/Quiz'
import { Card, Button } from '@mui/material';
import styled from "styled-components";
const PlaygroundPage = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  return (
    <Root className={startQuiz ? 'blur' : ''}>

      <Card className='card-content'>
        {startQuiz ? <Quiz /> : <Button variant='contained' className='quiz-btn' onClick={() => setStartQuiz(true)}>Start Quiz</Button>}
      </Card>

    </Root>
  )
}

const Root = styled.div`
.card-content {
  padding: 10px;
}
.quiz-btn{
  margin: auto;
  background-color: #086D67;
  color: white;
  text-transform: none;
  &:hover {
    background-color: #045350;
  }
}
`;
export default PlaygroundPage