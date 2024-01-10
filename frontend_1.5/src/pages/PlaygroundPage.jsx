import { Box } from '@mui/material'
import React from 'react'
import PlaygroundAppBar from '../components/PlaygroundAppBar'
import PlaygroundLanding from "../components/PlaygroundLanding"
const PlaygroundPage = () => {
  return (
    <Box>
      <PlaygroundAppBar />
      <PlaygroundLanding/>
    </Box>
  )
}



export default PlaygroundPage