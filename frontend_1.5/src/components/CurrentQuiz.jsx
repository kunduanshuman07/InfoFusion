
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import quizLogo from "../assets/Quiz.jpg"
import QuizDialog from './QuizDialog'
import { DataGrid } from '@mui/x-data-grid'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { rankDecider } from '../utils/rankDecider';
import axios from 'axios'
const CurrentQuiz = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([]);
  const [enability, setEnability] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizCount, setQuizCount] = useState();
  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      flex: 0,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (rowData) => (
        <Button startIcon={<EmojiEventsIcon style={{ color: rankDecider(rowData.row.id + 1) }} />}>{rowData.row.id+1}</Button>
      )
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.1,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "iqr",
      headerName: "IQR",
      flex: 0,
      headerClassName: "mytableheader",
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
  ]
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await axios.get('http://localhost:3000/quiz/latest-quiz');
      const { quizCount, userEnability } = await axios.post('http://localhost:3000/quiz/count-enability', {userId: user._id});
      setEnability(userEnability);
      setQuizCount(quizCount);
      const leaderBoard = await axios.post('http://localhost:3000/quiz/get-leaderboard', { quizId: data._id });
      const formattedRows = leaderBoard.data.leaderboard.map((item, index) => ({
        id: index,
        username: item.username,
        iqr: item.iqr,
      }))
      setRows(formattedRows)
    }
    fetchLeaderboard();
  }, [])
  const handleClose = () => {
    setStartQuiz(false);
  }
  return (
    <Root>
      <Box className='container'>
        <Box className='left-container'>
          <Typography className='header'>Hi, {user.name}</Typography>
          <Typography className='quiz-title'>Welcome to Daily Quiz # {quizCount} </Typography>
          <img src={quizLogo} alt='quiz-logo' width={250} height={150} className='quiz-img' />
          {!enability && <Box className='not-enable'>
            <Typography className='not-enable-text-one'>You have already attempted Today's Quiz.</Typography>
            <Typography className='not-enable-text-two'>See you tomorrow 12 Noon !</Typography>
          </Box>}
          {enability && <Button className='start-quiz-btn' disable={!enability} onClick={() => setStartQuiz(true)}>Start Today's Quiz</Button>}
        </Box>
        <Box className='right-container'>
          <Typography style={{ backgroundColor: "#0072e5", color: "white", borderRadius: "20px", textAlign: "center", marginTop: "0px", marginBottom: "5px", fontSize: "13px", fontWeight: "bold", padding: "5px" }}>Daily Quiz Leaderboard</Typography>
          <DataGrid columns={columns} rows={rows} hideFooter disableColumnFilter disableColumnMenu sx={{ height: "330px", border: "2px solid #d7e7fa" }} disableRowSelectionOnClick/>
        </Box>
      </Box>
      {startQuiz && <QuizDialog onCloseModal={handleClose} />}
    </Root>
  )
}
const Root = styled.div`
.container{
  display: flex;
  width: 100%;
  margin-top: 20px;
}
.left-container{
  width: 60%;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  margin-top: 10px;
  height: 380px;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.header{
  margin: 30px 0px 0px 0px;
  color: #444444;
  font-size: 22px;
  font-weight: bold;
}
.quiz-img{
  margin: 20px auto 0px auto;
  border-radius: 20px;
}
.not-enable{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.not-enable-text-one{
  color: red;
  font-size: 15px;
  font-weight: bold;
}
.not-enable-text-two{
  color: #0072e5;
  font-size: 18px;
  font-weight: bold;
}
.start-quiz-btn{
  margin: auto;
  margin-top: 20px;
  text-transform: none;
  font-size: 15px;
  background-color: #0072e5;
  font-weight: bold;
  width: 40%;
  color: white;
  border-radius: 20px;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.2);
  &: hover{
    background-color: #d7e7fa;
    color: #444444;
  }
}
.quiz-title{
  color: #01264a;
  font-weight: bold;
  font-size: 24px;
}
.right-container{
  width: 50%;
  margin-left: 20px;
  margin-top: 10px;
  height: 380px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.2);
}
`
export default CurrentQuiz