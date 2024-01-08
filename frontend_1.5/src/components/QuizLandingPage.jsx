import { Box } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import QuizDrawer from './QuizDrawer'
import CurrentQuiz from './CurrentQuiz'
import PastQuizzes from "./PastQuizzes"
const QuizLandingPage = () => {
  const [quizState, setQuizState] = useState("current");
  return (
    <Root>
        <Box className='container'>
            <Box className='quiz-choices'>
                <QuizDrawer setQuizState={setQuizState} quizState={quizState}/>
            </Box>
            <Box className='quiz'>
                {quizState === "current"? <CurrentQuiz/>: <PastQuizzes/>}
            </Box>
        </Box>
    </Root>
  )
}
const Root = styled.div`
.container{
  display: flex;
}
.quiz-choices{
  width: 30%;
}
.quiz{
  width: 70%;
}

`
export default QuizLandingPage