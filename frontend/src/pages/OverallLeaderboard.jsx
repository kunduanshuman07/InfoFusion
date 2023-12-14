import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from "axios";
import LeaderBoard from '../components/LeaderBoard';
import CircularProgress from '@mui/material/CircularProgress';
const OverallLeaderboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {

      field: "rank",
      headerName: "Rank",
      flex: 0.5,
      sortable: false,
      headerAlign: "center",
      headerClassName: "mytableheader",
      align: "center",
    },
    {

      field: "username",
      headerName: "Username",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      headerClassName: "mytableheader",
      align: "center",
    },
    {
      field: "score",
      headerName: "Total Score",
      flex: 0.5,
      sortable: false,
      headerAlign: "center",
      headerClassName: "mytableheader",
      align: "center",
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.5,
      sortable: false,
      headerAlign: "center",
      headerClassName: "mytableheader",
      align: "center",
    },
    {
      field: "quiztime",
      headerName: "Total Quiz Time",
      flex: 0.5,
      sortable: false,
      headerAlign: "center",
      headerClassName: "mytableheader",
      align: "center",
    },
  ]
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      const { data, status } = await axios.get('http://localhost:3000/quiz/overall-leaderboard');
      if (status === 200) {
        const formattedRows = data.leaderboard.map((item, index) => ({
          id: index,
          rank: index + 1,
          username: item.user.name,
          score: item.totalScore,
        }),
        );
        setRows(formattedRows);
        setLoading(false);
      }
    }
    fetchLeaderBoard();
  }, [])
  return (
    <Root>
      {loading ? <CircularProgress className='progress-bar' /> : <LeaderBoard rows={rows} columns={columns} />}
    </Root>
  )
}

const Root = styled.div`
  .mytableheader{
    background-color: #086D67;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0;
    padding: 0;
  }
`

export default OverallLeaderboard