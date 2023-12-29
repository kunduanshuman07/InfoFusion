import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ScoreCardModal from '../components/ScoreCardModal';
import { useModal } from '../context/ModalContext';
    
const ScoreCardPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const {setIsModalOpen} = useModal();
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [quizRawDates, setQuizRawDates] = useState();
    
    useEffect(() => {
        const quizzes = user?.quizzes;
        const rawDates = quizzes.map(quiz=>quiz.dateOfQuiz);
        setQuizRawDates(rawDates);
        const quizDates = quizzes.map(quiz => {
            const rawDate = quiz.dateOfQuiz;
            const dateObject = new Date(rawDate);
            const formattedDate = dateObject.toLocaleString();
            return formattedDate;
        });
        const iqrs = quizzes.map(quiz => quiz.rating);
        const quizData = {
            quizDates, iqrs
        }
        const formattedRows = quizData.quizDates.map((quizDate, index) => ({
            id: index,
            serial: index + 1,
            quizDate: quizDate,
            iqr: quizData.iqrs[index],
        }));
        setRows(formattedRows);
    }, [user])
    const handleCheckScorecard = (rowId) => {
        setSelectedDate(quizRawDates[rowId]);
        setIsModalOpen(true);
        setOpenModal(true);
    }
    const handleClose = () => {
        setIsModalOpen(false);
        setOpenModal(false);
    }
    const columns = [
        {

            field: "serial",
            headerName: "#",
            flex: 1.0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "quizDate",
            headerName: "Date and Time",
            flex: 2.0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "iqr",
            headerName: "IQR",
            flex: 1.0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "check-scorecard",
            headerName: "Check Scorecard",
            flex: 1.0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (rowData) => (
                <Button variant='filled' style={{ color: "#086D67", fontWeight: "bold", textTransform: "none" }} onClick={()=>{handleCheckScorecard(rowData.id)}}>Check</Button>
            ),
        },
    ]
    return (
        <>  
            <GlobalStyles openModal={openModal} />
            <Root style={{filter: openModal ? 'blur(5px)' : 'none' }}>
                <Box className='container'>
                    <Typography className='score'>Scorecards <SportsScoreIcon fontSize='30px' /> </Typography>
                </Box>
                <Box className='data-grid'>
                    <DataGrid
                        sx={{ border: "0px" }}
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        pageSizeOptions={[]}
                        disableColumnMenu
                        hideFooter
                    />
                </Box>
            </Root>
            {openModal && <ScoreCardModal onCloseModal={handleClose} selectedDate={selectedDate}/>}
        </>
    )
}
const GlobalStyles = styled.div`
  body {
    filter: ${({ openModal }) => (openModal ? 'blur(5px)' : 'none')};
    transition: filter 0.3s ease; 
  }
`;
const Root = styled.div`
    .container{
        padding: 10px;
        box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
        cursor: pointer;
        &:hover {
            box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
        }   
        border: 2px solid #ddd;
        border-radius: 10px;
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
        font-size: 25px;
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
        border: 2px solid #ddd;
        border-radius: 10px;
        padding: 10px;
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
export default ScoreCardPage