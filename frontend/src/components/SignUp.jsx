import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

const SignUp = () => {
  return (
    <form>
        <Typography>SignUp</Typography>
        <TextField placeholder='Email' size='small'/>
        <TextField placeholder='Password' size='small'/>
        <Button>SignUp</Button>
    </form>
  )
}

export default SignUp;