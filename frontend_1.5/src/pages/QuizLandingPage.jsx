import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CurrentQuiz from '../components/CurrentQuiz'
const QuizLandingPage = () => {
  return (
    <Root>
      <Box className='container'>
        <Box className='quiz'>
          <CurrentQuiz />
        </Box>
        <Box className='quiz-choices'>

        </Box>

      </Box>
    </Root>
  )
}
const Root = styled.div`
.container{
  display: flex;
  margin-top: 20px;
}
.quiz-choices{
  width: 40%;
}
.quiz{
  width: 60%;
}

`
export default QuizLandingPage