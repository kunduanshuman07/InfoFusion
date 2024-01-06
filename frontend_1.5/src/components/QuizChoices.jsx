import React, { useState } from 'react'
import styled from "styled-components"
import { Box, Card, Typography } from "@mui/material"
const QuizChoices = ({ setQuizSelection, handleQuizChoiceSelection }) => {
    const [todaysQuiz, setTodaysQuiz] = useState(true);
    const [pastQuiz, setPastQuiz] = useState(false);
    const [monthlyQuiz, setMonthyQuiz] = useState(false);
    const [weeklyQuiz, setWeeklyQuiz] = useState(false);
    const handleQuizChoices = (option) => {
        console.log(option);
        if(option === "Today's Quiz"){
            setTodaysQuiz(true);
            setMonthyQuiz(false);
            setWeeklyQuiz(false);
            setPastQuiz(false);
            handleQuizChoiceSelection("Today")
        }
        else if(option === "Past Quizzes"){
            setPastQuiz(true);
            setTodaysQuiz(false);
            setMonthyQuiz(false);
            setWeeklyQuiz(false);
            handleQuizChoiceSelection("Past")
        }
        else if(option === "Monthly Quiz"){
            setTodaysQuiz(false);
            setMonthyQuiz(true);
            setWeeklyQuiz(false);
            setPastQuiz(false);
            handleQuizChoiceSelection("Monthly")

        }
        else if(option === "Weekly Quiz"){
            setTodaysQuiz(false);
            setMonthyQuiz(false);
            setWeeklyQuiz(true);
            setPastQuiz(false);
            handleQuizChoiceSelection("Weekly")

        }
        setQuizSelection(true);
    }
    return (
        <Root>
            <Box className='container'>
                <Card className='card' onClick={()=>handleQuizChoices("Today's Quiz")} style={{backgroundColor:todaysQuiz?"white":"", color:todaysQuiz?"#0a686e":""}}>
                    <Typography>Today's Quiz</Typography>
                </Card>
                <Card className='card' onClick={()=>handleQuizChoices("Past Quizzes")} style={{backgroundColor:pastQuiz?"white":"", color:pastQuiz?"#0a686e":""}}>
                    <Typography>Past Quizzes</Typography>
                </Card>
                <Card className='card' onClick={()=>handleQuizChoices("Monthly Quiz")} style={{backgroundColor:monthlyQuiz?"white":"", color:monthlyQuiz?"#0a686e":""}}>
                    <Typography>Monthly Quiz</Typography>
                </Card>
                <Card className='card' onClick={()=>handleQuizChoices("Weekly Quiz")} style={{backgroundColor:weeklyQuiz?"white":"", color:weeklyQuiz?"#0a686e":""}}>
                    <Typography>Weekly Quiz</Typography>
                </Card>
            </Box>
        </Root>
    )
}
const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
  .container{
    display: flex;
    flex-direction: row;
  }
.card {
    cursor: pointer;
    border: 2px solid #0a686e;
    border-radius: 10px;
    text-align: center;
    background-color: #0a686e;
    color: white;
    margin: 0px 10px 5px 10px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }
`
export default QuizChoices