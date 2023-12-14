import React from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
const LeaderBoard = (props) => {
  console.log(props.rows);
  console.log(props.columns);
  return (
    <Root>
      <Box className='container'>
        <DataGrid
          sx={{ border: "1px solid #086D67" }}
          rows={props.rows}
          columns={props.columns}
          paginationModel={{ pageSize: 5, page: 0 }}
          pageSizeOptions={[25, 50, 100]}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
  cursor: pointer;
  &:hover {
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
  }
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}
`
export default LeaderBoard