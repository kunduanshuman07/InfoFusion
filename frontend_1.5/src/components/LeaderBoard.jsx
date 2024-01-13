import { Box, Button, TextField, InputAdornment, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import styled from 'styled-components';
import SearchIcon from "@mui/icons-material/Search";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { badgeDecider } from '../utils/BadgeDecider';
const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const handleViewProfile = (rowData) => {
    navigate(`/profile/${rowData.userId}`);
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
      field: "badge",
      headerName: "Badge",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (rowData) => (
        <Tooltip title={badgeDecider(rowData.row.user.quizzes)?.label}>
          <IconButton>
          <MilitaryTechIcon style={{color:badgeDecider(rowData.row.user.quizzes)?.hexColor}}/>
        </IconButton>
        </Tooltip>
      )
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
      field: "ifrating",
      headerName: "IF Rating",
      flex: 0,
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
          <Typography className='toolbar-text'>Quiz Leaderboard</Typography>
      </GridToolbarContainer>
    );
  }
  useEffect(() => {
    const fetchScoreCardsData = async () => {
      const { data } = await axios.get('http://localhost:3000/user/overall-leaderboard');
      const formattedRows = data.leaderboard.map((item, index) => ({
        id: index,
        rank: index + 1,
        userId: item.user._id,
        username: item.user.username,
        rating: item.rating,
        quizcount: item.quizcount,
        user: item.user,
        ifrating: badgeDecider(item.user.quizzes)?.finalAverage?.toFixed(2),
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
          className='grid-data' 
          hideFooterSelectedRowCount
        />
      </Box>
    </Root>
  )
}

const Root = styled.div`
  .data-grid{
    max-width: 99%;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
  .mytableheader{
    color: #444444;
    background-color: #d7e7fa;
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
    margin: 10px 20px;
  }
  .search-icon{
    color: #0072e5;
  }
  .toolbar-text{
    color: white;
    background-color: #0072e5;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    font-size: 15px;
    margin-left: 60px;
  }
`

export default Leaderboard
