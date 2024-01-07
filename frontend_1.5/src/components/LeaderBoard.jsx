import React from 'react'
import styled from 'styled-components'
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Tooltip, Typography, IconButton, TextField, InputAdornment } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import RuleBookIcon from '@mui/icons-material/Rule';
import SearchIcon from '@mui/icons-material/Search';
function CustomToolbar() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <GridToolbarContainer className='toolbar'>
      <Tooltip title='Refresh Leaderboard'>
        <IconButton style={{ color: "#0a686e", marginRight: "auto" }} onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <Box className='header'>
        <Typography className='header-title'>Leaderboard</Typography>
      </Box>
      <Box className='search-bar'>
        <TextField label='Search' placeholder='Search' size='small' InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size='small'>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }} />
      </Box>
      <Tooltip title='Rulebooks'>
        <IconButton style={{ color: "#0a686e", marginLeft: "auto" }} onClick={handleRefresh}>
          <RuleBookIcon />
        </IconButton>
      </Tooltip>
    </GridToolbarContainer>
  );
}
const LeaderBoard = (props) => {
  return (
    <Root>
      <Box className='container'>
        <DataGrid
          sx={{ boxShadow: "8px 4px 8px rgba(0.1, 0.1, 0.2, 0.2)", width: "95%", maxWidth: "95%" }}
          rows={props.rows}
          columns={props.columns}
          disableRowSelectionOnClick
          disableColumnMenu
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Root>
  )
}

const Root = styled.div`
display: flex;
justify-content: center;
align-items: center;
.container {
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
}
.toolbar{
  margin-bottom : 5px;
  margin-top: 5px;
}
.export{
  color: #0a686e;
  font-weight: bold;
}
.header{
  display: flex;
  flex-direction: row;
}
.header-title{
  background-color: #0a686e;
  border-radius: 5px;
  color: white;
  padding: 10px;
  padding-bottom: 8px;
  font-weight: bold;
  font-size: 15px;
  margin-right: 15px;
  margin-left: 5px;
}
.refresh-icon{
  margin-left: auto;
  margin-right: auto;
  margin-top: 13px;
  font-size: 25px;
  color: #0a686e;
}
.trophy-icon{
  font-size: 40px;
  color: #d4af37;
  margin-right: 15px;
}
.search-bar{
  display: flex;
  flex-direction: row;
}
`
export default LeaderBoard