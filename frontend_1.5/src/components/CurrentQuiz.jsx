
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import quizLogo from "../assets/Quiz.jpg"
import QuizDialog from './QuizDialog'
const CurrentQuiz = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [enability, setEnability] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const handleClose = () => {
    setStartQuiz(false);
  }
  return (
    <Root>
      <Box className='container'>
        <Typography className='header'>Hi, {user.name}</Typography>
        <img src={quizLogo} alt='quiz-logo' width={250} height={150} className='quiz-img' />
        {!enability && <Box className='not-enable'>
          <Typography className='not-enable-text-one'>You have already attempted Today's Quiz.</Typography>
          <Typography className='not-enable-text-two'>See you tomorrow 12 Noon !</Typography>
        </Box>}
        {enability && <Button className='start-quiz-btn' disable={!enability} onClick={()=>setStartQuiz(true)}>Start Today's Quiz</Button>}
      </Box>
      {startQuiz && <QuizDialog onCloseModal={handleClose}/>}
    </Root>
  )
}
const Root = styled.div`
.container{
  width: 90%;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
  margin-left: -30px;
  margin-top: 10px;
  height: 330px;
  border-radius:5px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.header{
  margin: 30px 0px 0px 0px;
  color: #444444;
  font-size: 23px;
  font-weight: bold;
}
.quiz-img{
  margin: 20px auto 0px auto;
  border-radius: 20px;
}
.not-enable{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.not-enable-text-one{
  color: red;
  font-size: 15px;
  font-weight: bold;
}
.not-enable-text-two{
  color: #0072e5;
  font-size: 18px;
  font-weight: bold;
}
.start-quiz-btn{
  margin: auto;
  margin-top: 20px;
  text-transform: none;
  font-size: 15px;
  background-color: #0072e5;
  font-weight: bold;
  width: 40%;
  color: white;
  border-radius: 20px;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.2);
  &: hover{
    background-color: #d7e7fa;
    color: #444444;
  }
}
`
export default CurrentQuiz