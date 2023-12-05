import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Login = () => {
  return (
    <form>
        <Typography>Login</Typography>
        <TextField placeholder='Email' size='small'/>
        <TextField placeholder='Password' size='small'/>
        <Button>Login</Button>
    </form>
  )
}

export default Login