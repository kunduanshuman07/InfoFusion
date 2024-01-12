import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import styled from 'styled-components';
import SearchIcon from "@mui/icons-material/Search";
import ViewScorecardDialog from './ViewScorecardDialog';
const Scorecards = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [scorecardData, setScorecardData] = useState([]);
  const [quizDate, setQuizDate] = useState();
  const handleClose = () => {
    setModalOpen(false);
  }
  const handleViewScorecard = (rowData) => {
    setScorecardData(rowData.scorecard)
    setQuizDate(rowData.date);
    setModalOpen(true);
  }
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
      field: "date",
      headerName: "Date",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "score",
      headerName: "Score",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "iqr",
      headerName: "IQR",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "View",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (rowData) => (
        <Button className='view-scorecard' variant='contained' onClick={() => handleViewScorecard(rowData.row)}>
          Scorecard
        </Button>
      )
    },
  ]
  function CustomToolbar() {
    return (
      <GridToolbarContainer className='toolbar'>
        <TextField
          placeholder='Search Date'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size='small' className='search-icon'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }} />
      </GridToolbarContainer>
    );
  }
  useEffect(() => {
    const fetchScoreCardsData = async () => {
      const { data } = await axios.post('http://localhost:3000/user/user-scorecards', { userId: user._id });

      const dateFormat = (quizDate) => {
        const dateObject = new Date(quizDate);
        const day = dateObject.getUTCDate().toString().padStart(2, '0');
        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
      }

      const formattedRows = data.map((item, index) => ({
        id: index,
        sno: index + 1,
        date: dateFormat(item.dateOfQuiz),
        score: item.score,
        iqr: item.rating,
        quizId: item.quizId,
        scorecard: item.scorecard,
      }))
      setRows(formattedRows)
    }
    fetchScoreCardsData();
  }, [])
  return (
    <Root>
      <Box className='data-grid'>
        <DataGrid
          columns={columns}
          rows={rows}
          disableColumnMenu
          disableColumnFilter
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
          className='grid-data' />
      </Box>
      {modalOpen && <ViewScorecardDialog onCloseModal={handleClose} scorecard={scorecardData} quizDate={quizDate}/>}
    </Root>
  )
}

const Root = styled.div`
  .data-grid{
    max-width: 99%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  }
  .mytableheader{
    color: #444444;
  }
  .view-scorecard{
    font-weight: bold;
    text-transform: none;
    border-radius: 20px;
    width: 30px;
    height: 30px;
    font-size: 10px;
  }
  .grid-data{
    color: #444444;
  }
  .toolbar{
    margin: 0px auto;
  }
  .search-icon{
    color: #0072e5;
  }
`

export default Scorecards
