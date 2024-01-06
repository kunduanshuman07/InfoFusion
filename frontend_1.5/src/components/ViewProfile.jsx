import React, { useEffect, useState } from 'react'
import { DialogTitle, Box, Dialog, Typography, DialogContent, Button } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import styled from 'styled-components'
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import {useNavigate} from "react-router-dom";
const ViewProfile = ({ onCloseModal, userId }) => {
  console.log(userId);
  const navigate = useNavigate();
  const [rating, setRating] = useState(100);
  const [highestRating, setHighestRating] = useState(100);
  const [iqrRow, setIqrRow] = useState([]);
  const [seriesRow, setSeriesRow] = useState([]);
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const handleViewFullDashboard = () => {
    navigate(`/quiz-dashboard/${userId}`);
  }
  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = {
        userId: userId
      }
      const { data } = await axios.post("http://localhost:3000/user/user-details", userDetails);
      console.log(data);
      const xAxisData = data.quizzes.map((quiz, index) => index + 1);
      const seriesData = data.quizzes.map(quiz => quiz.rating);
      setIqrRow(xAxisData);
      setSeriesRow(seriesData);
      setUsername(data.username);
      setName(data.name);
      setRating(data.rating);
      setHighestRating(data.highestRating);
    }
    fetchUser();
  }, [])
  return (
    <>
      <Dialog open={true} onClose={onCloseModal} fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#086D67",
            fontSize: "16px",
            display: "flex"
          }}
        >
          <Typography style={{ color: "white", fontWeight: "bold" }}>{username} : {name}</Typography>
          <CloseIcon className="close-icon" style={{ color: 'white', cursor: "pointer", marginLeft: "auto" }} onClick={onCloseModal} />
        </DialogTitle>
        <DialogContent>
          <Root>
            <Box className='grids'>
              <Box className='rating-grid'>
                <Box className='rank-box'>
                  <EmojiEventsIcon className='trophy-icon' />
                </Box>
                <Box className='rank-info'>
                  <h2>Rating: {rating}</h2>
                  <h3>Highest Rating: {highestRating}</h3>
                </Box>
              </Box>
              <Box className='graph-grid'>
                <Box className='iqr-graph'>
                  <LineChart
                    xAxis={[{ data: iqrRow }]}
                    series={[
                      {
                        data: seriesRow,
                        label: "Individual Quiz Rating",
                        color: "#7d37a1"
                      },
                    ]}
                    width={300}
                    height={200}
                  />
                </Box>
              </Box>
            </Box>
            <Button onClick={handleViewFullDashboard} variant='contained' style={{backgroundColor: "#086D67", color: "white", width: "40%", margin: "auto", marginTop: "10px", }}>View Full Profile</Button>
          </Root>
        </DialogContent>
      </Dialog>
    </>

  )
}
const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .grids{
    display: flex;
  }
  .rating-grid {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 0px;
    border-radius: 10px;
    border: 2px solid #ddd;
    width: 400px;
    height: 200px;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.15);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
    margin-right: 10px;
  }
  .graph-grid{
    display: flex;
    border-radius: 10px;
    border: 2px solid #ddd;
    box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.15);
    cursor: pointer;
    &:hover {
      box-shadow: 8px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
    }
  }
  .rank-info{
    margin: auto;
    color: #086D67;
    text-align: center;
  }
  .trophy-icon {
    color: #d4af37;
    font-size: 50px;
    margin-left: 100px;
    margin-top: 20px;
  }
  .view-profile{
    display: flex;
  }
  .profile-btn{
    margin: auto;
    margin-top: 20px;
    background-color: #086D67;
    border: 2px solid #086D67; 
    color: white;
    font-size: 11px;
    font-weight: bold;
    border: 2px solid #086D67;
    border-radius: 10px;
  }
`;
export default ViewProfile