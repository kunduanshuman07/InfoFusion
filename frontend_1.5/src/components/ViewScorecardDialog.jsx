import React, { useEffect, useState } from "react";
import {
    Box,
    IconButton, Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import CloseIcon from "@mui/icons-material/Close"
import styled from "styled-components"
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
const ViewScorecardDialog = ({ onCloseModal, scorecard, quizDate }) => {
    console.log(scorecard);
    const [rows, setRows] = useState([]);
    const columns = [
        {
            field: "sno",
            headerName: "#",
            flex: 0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "question",
            headerName: "Question",
            flex: 0.2,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "youranswer",
            headerName: "Your Answer",
            flex: 0.1,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "correctoption",
            headerName: "Correct Option",
            flex: 0.1,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "points",
            headerName: "Score",
            flex: 0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "type",
            headerName: "Type",
            flex: 0,
            headerClassName: "mytableheader",
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
    ]
    const getCategoryLabel = (type) => {
        switch (type) {
            case '1':
                return 'Easy';
            case '2':
                return 'Medium';
            case '3':
                return 'Hard';
            case '4':
                return 'Misc';
            default:
                return 'Unknown';
        }
    };
    function CustomToolbar() {
        return (
            <GridToolbarContainer className='toolbar'>
                <GridToolbarExport  className='export'/>
            </GridToolbarContainer>
        );
    }
    useEffect(() => {
        const formattedRows = scorecard.map((item, index) => ({
            id: index,
            sno: index + 1,
            question: item.question,
            youranswer: item.yourAnswer===""?"[Skipped]":item.yourAnswer,
            correctoption: item.correctOption,
            points: item.points,
            type: getCategoryLabel(item.type),
        }))
        setRows(formattedRows);
    }, [])
    return (
        <Dialog open={true} onClose={onCloseModal} fullScreen>
            <DialogTitle
                sx={{
                    backgroundColor: "#d7e7fa",
                    display: "flex"
                }}
            >
                <Typography style={{ color: "#444444", fontWeight: "bold" }}>#Quiz Date : {quizDate}</Typography>
                <IconButton onClick={onCloseModal} style={{ backgroundColor: "white", color: "#444444", marginLeft: "auto" }} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{ backgroundColor: "#d7e7fa" }}>
                <Root>
                    <Box className='datagrid-container'>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            hideFooter
                            disableColumnMenu
                            disableColumnFilter
                            slots={{toolbar: CustomToolbar}}
                        />
                    </Box>
                </Root>
            </DialogContent>
        </Dialog>
    );
};

const Root = styled.div`
    .datagrid-container{
        background-color: white;
        max-width: 100%;
        border-radius: 20px;
        padding: 10px;
        height: 450px;
        margin-top: 20px;
    }
    .toolbar{
        margin: 0px auto;
        padding: 5px;
    }
    .export{
        background-color: #0072e5;
        color: white;
        font-weight: bold;
        border-radius: 20px;
        font-size: 12px;
        text-transform: none;
        &:hover{
            background-color: #d7e7fa;
            color: #444444;
        }
    }
`

export default ViewScorecardDialog;
