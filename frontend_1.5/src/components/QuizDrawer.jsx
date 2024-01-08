import React from 'react'
import Box from '@mui/material/Box';
import { ListItem, Typography } from '@mui/material';
import styled from "styled-components"
const QuizDrawer = ({setQuizState, quizState}) => {
    console.log(setQuizState)
    return (
        <Root>
            <Box className='container'>
                <ListItem
                    style={{color: "#444444", backgroundColor: quizState==="current"?"white": ""}}
                    className='list-item'
                    onClick={()=>setQuizState("current")}
                >
                    <Typography className='list-text'>Today's Quiz</Typography>
                </ListItem>
                <ListItem
                    style={{color: "#444444", backgroundColor: quizState==="past"?"white": ""}}
                    className='list-item'
                    onClick={()=>setQuizState("past")}
                >
                    <Typography className='list-text'>Past Quizzes</Typography>
                </ListItem>
            </Box>
        </Root>
    )
}

const Root = styled.div`
    .container{
        display: flex;
        flex-direction: column;
        background-color: #d7e7fa;
        margin-top: 10px;
        width: 80%;
        height: 100px;
        border-radius: 5px;
        margin-right: 0px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    .list-item{
        margin:auto;
        border-radius: 5px;
        width: 90%;
    }
    .list-text{
        margin: auto;
    }
`

export default QuizDrawer

