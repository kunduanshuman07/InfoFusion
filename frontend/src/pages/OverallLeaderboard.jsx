import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeaderBoard from '../components/LeaderBoard';
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from '../hooks/useFetch';

const OverallLeaderboard = () => {
  const [rows, setRows] = useState([]);
  const { data } = useFetch({
    method: 'GET',
    url: '/user/overall-leaderboard',
  });
  const columns = [
    {
      field: 'rank',
      headerName: 'Rank',
      flex: 0.5,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 0.5,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
    {
      field: 'quizcount',
      headerName: 'Total Quiz Count',
      flex: 0.5,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
  ];

  useEffect(() => {
    if (data && data.leaderboard) {
      const formattedRows = data.leaderboard.map((item, index) => ({
        id: index,
        rank: index + 1,
        username: item.user.name,
        rating: item.rating,
        quizcount: item.quizcount,
      }));
      setRows(formattedRows);
    }
  }, [data]);

  return (
    <Root>
      {!data ? <CircularProgress className="progress-bar" /> : <LeaderBoard rows={rows} columns={columns} />}
    </Root>
  );
};

const Root = styled.div`
  .mytableheader {
    background-color: #086d67;
    color: white;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0;
    padding: 0;
  }
  .progress-bar{
    color: #086d67;
    margin-left: 45%;
    margin-top: 15%;
    font-size: 100px;
  }
`;

export default OverallLeaderboard;
