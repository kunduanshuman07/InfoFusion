import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import Quiz from './Quiz';
import axios from 'axios';
const PastQuizzes = () => {
    const [rows, setRows] = useState([]);
    const [questions, setQuestions] = useState();
    const [startQuiz, setStartQuiz] = useState(false);
    const [quizId, setQuizId] = useState();
    const handleQuizData = async (quizdata) => {
        try {
            const quizid = {
                quizId: quizdata.row.quizId
            }
            console.log(quizid);
            const response = await axios.post('http://localhost:3000/quiz/getquizdata', quizid);
            setQuizId(quizdata.row.quizId);
            setQuestions(response.data.questions);
            setStartQuiz(true)
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }
    useEffect(() => {
        const fetchAllQuizzes = async () => {
            const { data } = await axios.get('http://localhost:3000/quiz/getall-quizzes')
            const dateFormat = (quizDate) => {
                const dateObject = new Date(quizDate);
                const day = dateObject.getUTCDate().toString().padStart(2, '0');
                const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
                const year = dateObject.getUTCFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                return formattedDate;
            }
            const formattedRows = data.map((quizData, index) => ({
                id: index,
                sno: index + 1,
                DateOfQuiz: dateFormat(quizData.createdAt),
                quizId: quizData._id,
            }));
            setRows(formattedRows);
        }
        fetchAllQuizzes();
    }, [])
    const columns = [
        {

            field: "sno",
            headerName: "S.No",
            flex: 0.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "DateOfQuiz",
            headerName: "Date",
            flex: 1.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "try",
            headerName: "Attempt",
            flex: 0.5,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (rowData) => (
                <Button variant='contained' className='try-btn' onClick={() => handleQuizData(rowData)}>Try</Button>
            ),
        },
    ];
    return (
        <>
            {startQuiz ? <Quiz questions={questions} quizId={quizId} callFrom='Past'/> : <Root>
                <Box>
                    <DataGrid rows={rows} columns={columns} hideFooterSelectedRowCount />
                </Box>
            </Root>}
        </>
    )
}
const Root = styled.div`
background-color: white;
padding: 10px;
border-radius: 20px;
box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.4);
    .try-btn{
        height: 25px;
        color: #0a686e;
        background-color: white;
        border: 2px solid #0a686e;
        border-radius: 10px;
        &:hover {
            background-color: #0a686e;
            color: white;
            
        }   
    }
`
export default PastQuizzes