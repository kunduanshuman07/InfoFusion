import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CurrentQuiz from '../components/CurrentQuiz'
const QuizLandingPage = () => {
  return (
    <Root>
      <CurrentQuiz/>
    </Root>
  )
}
const Root = styled.div`

`
export default QuizLandingPage