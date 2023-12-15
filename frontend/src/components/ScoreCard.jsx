import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import axios from "axios";
function CustomToolbar() {
    const handleBack = () => {
        
    }
    return (
        <GridToolbarContainer className='toolbar'>
            <GridToolbarExport className='export' />
            <Tooltip title='Back to Playground'>
                <IconButton style={{ color: "#086D67", marginLeft: "700px" }} onClick={handleBack}>
                    <FastRewindIcon />
                </IconButton>
            </Tooltip>
        </GridToolbarContainer>
    );
}
const ScoreCard = (props) => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    const [rows, setRows] = useState([]);
    const columns = [
        {

            field: "question",
            headerName: "Questions",
            flex: 1.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "useranswer",
            headerName: "Your answers",
            flex: 0.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "correctanswer",
            headerName: "Correct Answers",
            flex: 0.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "points",
            headerName: "Points",
            flex: 0.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
    ]
    useEffect(() => {
        if (props.iqr !== 0) {
            const updateQuizDataToUser = async () => {
                const quizUserData = {
                    quizId: props.quizId,
                    score: props.score,
                    userId: user._id,
                    iqr: props.iqr,
                }
                console.log(quizUserData);
                const response = await axios.patch('http://localhost:3000/quiz/update-user-quiz-data', quizUserData);
                if (response.status === 200) {
                    console.log(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            }
            const formattedRows = props.attemptedQuestions.map((item, index) => ({
                id: index,
                question: item.question.questionText,
                useranswer: item.yourAnswer,
                correctanswer: item.correctOption.optionText,
                points: item.points,
            }),
            );
            setRows(formattedRows);
            updateQuizDataToUser();
        }
    }, [props.iqr]);
    return (
        <Root>
            <Box className='container'>
                <Typography className='complete'>Quiz Complete!</Typography>
                <Typography className='score'>Your Score: {props.score} / {props.questionsLength} </Typography>
            </Box>
            <Box className='data-grid'>
                <DataGrid
                    sx={{ border: "0px" }}
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[]}
                    disableColumnMenu
                    slots={{ toolbar: CustomToolbar }}
                    hideFooter
                />
            </Box>
        </Root>
    )
}
const Root = styled.div`
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
    .complete{
        font-size: 20px;
        font-weight: bold;
        color: #086D67;
        text-decoration: underline;
      }
      .score{
        font-size: 30px;
        font-weight: bolder;
        color: #086F67;
      }
    .data-grid{
        margin-top: 10px;
        box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
        cursor: pointer;
        &:hover {
            box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
        }   
        border-left: 2px solid #086D67;
        border-radius: 5px;
        padding: 20px;
    }
    .mytableheader{
        background-color: #086D67;
        color: white;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 0;
      }
      .toolbar{
        margin-right: auto;
        margin-bottom : 10px;
      }
      .export{
        color: #086D67;
        font-weight: bold;
      }
`
export default ScoreCard