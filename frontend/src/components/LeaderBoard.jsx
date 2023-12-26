import React from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Tooltip, Typography } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RefreshIcon from '@mui/icons-material/Refresh';
const LeaderBoard = (props) => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <Root>
      <Box className='container'>
        <Box className='header'>
          <EmojiEventsIcon className='trophy-icon' />
          <Typography className='header-title'>Leaderboard</Typography>
          <Tooltip title='refresh page'>
            <RefreshIcon className='refresh-icon' onClick={handleRefresh} />
          </Tooltip>
        </Box>
        <DataGrid
          sx={{ boxShadow: "8px 4px 8px rgba(0.1, 0.1, 0.2, 0.2)", width: "95%", maxWidth: "95%" }}
          rows={props.rows}
          columns={props.columns}
          disableRowSelectionOnClick
          disableColumnMenu
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
  margin: auto;
  margin-bottom : 5px;
  margin-top: 5px;
}
.export{
  color: #086D67;
  font-weight: bold;
}
.header{
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}
.header-title{
  background-color: #086D67;
  border-radius: 5px;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  font-size: 20px;
}
.refresh-icon{
  margin-left: 15px;
  margin-top: 13px;
  font-size: 25px;
  color: #086D67;
}
.trophy-icon{
  font-size: 40px;
  color: #d4af37;
  margin-right: 15px;
  margin-top: 5px;
}
`
export default LeaderBoard