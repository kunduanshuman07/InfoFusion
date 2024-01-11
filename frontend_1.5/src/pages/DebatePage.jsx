import React from 'react'
import { Box } from "@mui/material";
import DebateTopics from '../components/DebateTopics';
import DebateAppbar from "../components/DebateAppBar";
const DebatePage = () => {
  return (
    <Box>
      <DebateAppbar/>
      <DebateTopics/>
    </Box>
  )
}

export default DebatePage