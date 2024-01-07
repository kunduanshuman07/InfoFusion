import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthProvider';
export default function DenseAppBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { auth } = useAuth();
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }
  const handleSignup = () => {
    navigate('/signup')
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{ backgroundColor: "#0b4e52", height: "50px" }}>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          {!auth ? <Box style={{ marginRight: "auto" }}>
            <Button
              variant='contained'
              style={{
                height: "30px",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px",
                borderRadius: "20px",
                backgroundColor: "white",
                color: "#0b4e52",
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Button variant='contained' style={{ height: "30px", marginTop: "10px", marginRight: "10px", borderRadius: "20px", backgroundColor: "white", color: "#0b4e52", fontWeight: "bold", textTransform: "none", boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)" }} onClick={handleSignup}>Signup</Button>
          </Box> : <>
            <Box style={{display: "flex"}}>
              <Box style={{display: "flex", marginLeft: "auto" }}>
                <Avatar src={`http://localhost:3000/userImages/${user.picturePath}`} alt={user.name} style={{ marginTop: "5px", marginLeft: "20px" }} />
                <Typography style={{ marginTop: "12px", marginLeft: "15px", marginBottom: "10px",fontWeight: "bolder" , backgroundColor: "white", color: "#0b4e52", borderRadius: "20px", padding: "0px 10px 0px 10px"}}>{user.name}</Typography>
              </Box>
            </Box>
            <Box style={{ display: "flex",marginLeft: "930px" }}>
              <Button
                variant='contained'
                style={{
                  height: "30px",
                  marginTop: "10px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  color: "#0b4e52",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </>
          }
        </Box>
      </AppBar>
    </Box>
  );
}
