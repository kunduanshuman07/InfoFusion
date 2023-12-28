import React from 'react'
import { Box } from "@mui/material";
import Header from '../components/Header';
import CategorySelection from '../components/CategorySelection';

const OpinionPage = () => {
  return (
    <Box>
      <Header title="Debate" />
      <CategorySelection />
    </Box>
  )
}

export default OpinionPage