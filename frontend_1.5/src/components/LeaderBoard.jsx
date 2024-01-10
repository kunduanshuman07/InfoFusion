import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PlaygroundAppBar from './PlaygroundAppBar'
import axios from "axios";
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import styled from 'styled-components';
import SearchIcon from "@mui/icons-material/Search";
import ViewScorecardDialog from './ViewScorecardDialog';
const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  }
  const handleViewProfile = (rowData) => {
    setModalOpen(true);
  }
  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      flex: 0,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quizcount",
      headerName: "Quiz Count",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Profile",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (rowData) => (
        <Button className='view-scorecard' variant='outlined' onClick={() => handleViewProfile(rowData.row)}>
          View
        </Button>
      )
    },
  ]
  function CustomToolbar() {
    return (
      <GridToolbarContainer className='toolbar'>
        <TextField
          placeholder='Search User'
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
      const { data } = await axios.get('http://localhost:3000/user/overall-leaderboard');
      const formattedRows = data.leaderboard.map((item, index) => ({
        id: index,
        rank: index + 1,
        username: item.user.username,
        rating: item.rating,
        quizcount: item.quizcount,
      }))
      setRows(formattedRows)
    }
    fetchScoreCardsData();
  }, [])
  return (
    <Root>
      <PlaygroundAppBar />
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
    </Root>
  )
}

const Root = styled.div`
  .data-grid{
    max-width: 90%;
    height: 335px;
    padding: 10px;
    border-radius: 20px;
    margin-top: 10px;
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
    color: #0072e5;
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

export default Leaderboard
