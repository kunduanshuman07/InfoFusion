import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Divider, Box, IconButton, CircularProgress } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';
import { GlobalStyles } from "@mui/system";
function CustomToolbar() {
    return (
        <GridToolbarContainer className='toolbar'>
            <GridToolbarExport className='export' />
        </GridToolbarContainer>
    );
}
const ScrollbarStyles = (
    <GlobalStyles
        styles={{
            '*::-webkit-scrollbar': {
                width: '0.4em'
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.1)'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: '#086D67',
            }
        }}
    />
);
const ScoreCardModal = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const columns = [
        {

            field: "question",
            headerName: "Questions",
            flex: 2,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "useranswer",
            headerName: "Your answers",
            flex: 1,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "correctanswer",
            headerName: "Correct Answers",
            flex: 1,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "type",
            headerName: "Category",
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
        const quiz = user.quizzes.find(item => item.dateOfQuiz === props.selectedDate);
        const scorecard = quiz.scorecard;
        const formattedRows = scorecard.map((item, index) => ({
            id: index,
            question: item.question.questionText,
            useranswer: item.yourAnswer,
            correctanswer: item.correctOption.optionText,
            type: item.type,
            points: item.points,
        }));
        setRows(formattedRows);
        setLoading(false);
    }, [user])
    return (
        <>  
            
            {ScrollbarStyles}
            {loading ? <CircularProgress /> : <Dialog open={true} onClose={props.onCloseModal} fullWidth={true} maxWidth='md'>
                <Root>
                    <DialogTitle
                        sx={{
                            backgroundColor: "#086D67",
                            fontSize: "20px",
                        }}
                    >
                        <Box className='header'>
                            <h3 style={{ color: "white", fontWeight: "bold" }}>Scorecard</h3>
                            <IconButton onClick={props.onCloseModal} className='close-btn'>
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Box className='data-grid'>
                            <DataGrid
                                sx={{ border: "0px", width: "100%" }}
                                rows={rows}
                                columns={columns}
                                disableRowSelectionOnClick
                                pageSizeOptions={[]}
                                disableColumnMenu
                                slots={{ toolbar: CustomToolbar }}
                                hideFooter
                            />
                        </Box>
                    </DialogContent>
                </Root>
            </Dialog>}
        </>
    )
}

const Root = styled.div`
    .header{
        display: flex;
        flex-direction: row;
    }
    .close-btn{
        margin-left: auto;
        color: white;
    }
    .data-grid{
        margin-top: 10px;
        margin-left: -20px;
        margin-right: -20px;
        cursor: pointer; 
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
        margin-left: auto;
        margin-bottom : 10px;
      }
      .export{
        color: #086D67;
        font-weight: bold;
        margin-top: -35px;
      }
`

export default ScoreCardModal