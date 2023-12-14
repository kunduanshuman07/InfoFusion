import React from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
const LeaderBoard = (props) => {
  console.log(props.rows);
  console.log(props.columns);
  return (
    <Root>
      <Box className='container'>
        <Box className='header'>
          <EmojiEventsIcon className='trophy-icon'/>
          <Typography className='header-title'>Leaderboard</Typography>
        </Box>
        <DataGrid
          sx={{boxShadow: "8px 4px 8px rgba(0.1, 0.1, 0.2, 0.2)", width: "95%", maxWidth: "95%" }}
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
}
.header-title{
  color: #086D67;
  font-weight: bold;
  font-size: 20px;
}
.trophy-icon{
  font-size: 40px;
  color: #d4af37;
}
`
export default LeaderBoard