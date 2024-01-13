import React from 'react'
import styled from 'styled-components'
import AppBarComponent from "../components/AppBarComponent";
import { Box } from '@mui/material';
import ConnectPosts from '../components/ConnectPosts';
import ConnectNotifications from '../components/ConnectNotifications';
const ConnectPage = () => {
  return (
    <Root>
      <AppBarComponent />
      <Box className='container'>
        <ConnectPosts />
        <ConnectNotifications />
      </Box>
    </Root>
  )
}
const Root = styled.div`
.container{
  display: flex;
  width: 100%;
}
`
export default ConnectPage