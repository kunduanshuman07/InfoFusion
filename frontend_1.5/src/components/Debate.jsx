import { Box, Dialog, DialogTitle, DialogContent, Typography, IconButton, Button, Avatar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CloseIcon from "@mui/icons-material/Close";
import SnackBarComponent from "../components/SnackBarComponent";
import GroupIcon from '@mui/icons-material/Group';
import axios from "axios";
const Debate = ({ motion, setMotion, onCloseModal, debate }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [inFavorStatements, setInFavorStatements] = useState([]);
  const [againstStatements, setAgainstStatements] = useState([]);
  const [addStatement, setAddStatement] = useState('');
  useEffect(() => {
    if (motion === 'Enter') {
      const againstEnability = Boolean(debate?.usersAgainst && debate?.usersAgainst.find(instance => instance.userId === user._id));
      const favorEnability = Boolean(debate?.usersInFavor && debate?.usersInFavor.find(instance => instance.userId === user._id));
      if (favorEnability) {
        setMotion('Favor');
      }
      else if (againstEnability) {
        setMotion('Against');
      }
    }
    const fetchStatements = async () => {
      const { data } = await axios.post('http://localhost:3000/debate/getall-pinned-statements', { debateId: debate._id });
      setInFavorStatements(data.inFavorStatements);
      setAgainstStatements(data.againstStatements);
    }
    fetchStatements();
  }, [])
  const handlePinStatement = async () => {
    console.log(addStatement);
    if (motion === 'Favor') {
      await axios.post('http://localhost:3000/debate/pinstatement-infavor', { debateId: debate._id, userId: user._id, statement: addStatement });
      const { data } = await axios.post('http://localhost:3000/debate/getall-pinned-statements', { debateId: debate._id });
      setInFavorStatements(data.inFavorStatements);
      setAgainstStatements(data.againstStatements);
    }
    else {
      await axios.post('http://localhost:3000/debate/pinstatement-against', { debateId: debate._id, userId: user._id, statement: addStatement });
      const { data } = await axios.post('http://localhost:3000/debate/getall-pinned-statements', { debateId: debate._id });
      setInFavorStatements(data.inFavorStatements);
      setAgainstStatements(data.againstStatements);
    }
  }
  return (
    <Dialog open={true} fullScreen onClose={onCloseModal}>
      <SnackBarComponent severity="info" message={motion === "Favor" ? "You have joined in Favor of the motion!" : "You have joined against the motion!"} />
      <DialogTitle
        sx={{
          display: "flex",
          backgroundColor: "#d7e7fa",
          fontSize: "19px",
          fontWeight: "bolder",
          height: "70px",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Box>
          <Typography style={{ color: "#444444", margin: "auto", fontWeight: "bold" }}>Debate id: #{debate.debateId}
          </Typography>
        </Box>
        <Box className='timer' style={{ display: "flex", cursor: "pointer", marginLeft: "auto", backgroundColor: "white", color: "#444444", borderRadius: "20px", fontWeight: "bolder", padding: "0px" }}>
          <IconButton onClick={onCloseModal} size='small'>
            <CloseIcon className="close-icon" style={{ fontWeight: "bolder" }} onClick={onCloseModal} />
          </IconButton>
        </Box>

      </DialogTitle>
      <DialogContent>
        <Root>
          <Box className='container'>
            <Box className='left-container'>
              <Box className='header-container'>
                <Box className='header-elements'>
                  <Typography className='header-text'>{debate.debateTitle}</Typography>
                  <Button startIcon={<GroupIcon />} className='user-btn'>72 Active Debaters</Button>
                </Box>
                <Box className='user-btn-box'>

                  <TextField placeholder='Statement' fullWidth size='small' onChange={(e) => setAddStatement(e.target.value)} />
                  <Button
                    className="statement-btn"
                    style={{
                      color: motion === "Favor" ? "#01781b" : "#96050c",
                      border: motion === "Favor" ? "2px solid #01781b" : "2px solid #96050c",
                    }}
                    variant='outlined'
                    onClick={handlePinStatement}
                  >
                    Pin Statement
                  </Button>

                </Box>
              </Box>
              <Box className='statement-container'>
                <Box className='favor-container'>
                  <Box className='header-favor'>
                    <Typography className='favor-text'>In Favor</Typography>
                  </Box>
                  {inFavorStatements.map((data) => (
                    <Box className='favor-statements'>
                      <IconButton>
                        <Avatar alt={data.debateUser.name} src={`http://localhost:3000/userImages/${data.debateUser.picturePath}`} className='avatar' style={{ backgroundColor: "#01781b" }} />
                      </IconButton>
                      <Typography className='stat-text'>{data.statementText}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box className='against-container'>
                  <Box className='header-against'>
                    <Typography className='against-text'>Against</Typography>
                  </Box>
                  {againstStatements.map((data) => (
                    <Box className='favor-statements'>
                      <IconButton>
                        <Avatar alt={data.debateUser.name} src={`http://localhost:3000/userImages/${data.debateUser.picturePath}`} className='avatar' style={{ backgroundColor: "#01781b" }} />
                      </IconButton>
                      <Typography className='stat-text'>{data.statementText}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className='right-container'>

            </Box>
          </Box>
        </Root>
      </DialogContent>
    </Dialog>

  )
}

const Root = styled.div`
  .container{
    display: flex;
    margin-top: 10px;
    border: 2px solid #d7e7fa;
    border-radius: 20px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.4);
  }
  .left-container{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header-container{
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .header-text{
    font-size: 23px;
    color: #444444;
    font-weight: bold;
    margin-top: 20px;
  }
  .header-elements{
    display: flex;
  }
  .user-btn-box{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .user-btn{
    color: #01264a;
    text-transform: none;
    font-size: 15px;
    font-weight: bold;
    width: 220px;
    margin: auto;
    margin-top: 20px;
  }
  .statement-btn{
    margin-left: 10px;
    margin-top: 20px;
    text-transform: none;
    font-weight: bold;
    font-size: 15px;
    color: white;
    border-radius: 20px;
    width: 200px;
  }
  .statement-container{
    display: flex;
  }
  .favor-container{
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 1000vh;
  }
  .against-container{
    width: 50%;
    border-left: 2px solid #d7e7fa;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 1000vh;
  }
  .favor-text{
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    
  }
  .against-text{
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
  }
  .header-favor{
    background-color: #01781b;
    height: 50px;
  }
  .header-against{
    background-color: #96050c;
    height: 50px;
  }
  .favor-statements{
    display: flex;
  }
  .against-statements{
    display: flex;
  }
  .stat-text{
    color: #444444;
    margin: auto;
    margin-left: 10px;
    font-weight: bold;
  }
  .avatar{
    width: 30px;
    height: 30px;
  }
`

export default Debate