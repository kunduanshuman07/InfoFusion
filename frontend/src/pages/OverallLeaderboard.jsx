import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeaderBoard from '../components/LeaderBoard';
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from '../hooks/useFetch';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OverallLeaderboard = () => {
  const [rows, setRows] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [username, setUsername] = useState("");
  const { data } = useFetch({
    method: 'GET',
    url: '/user/overall-leaderboard',
  });
  const handleProfileView = (rowData) => {
    setUsername(rowData.row.username);
    setProfileModal(true);
  }
  const columns = [
    {
      field: 'rank',
      headerName: 'Rank',
      flex: 0,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 0.5,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
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
      headerName: 'Quiz Count',
      flex: 0,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'mytableheader',
      align: 'center',
    },
    {
      field: 'viewprofile',
      headerName: "View Profile",
      flex: 0,
      sortable: false,
      headerAlign: "center",
      headerClassName: "mytableheader",
      align: " center ",
      renderCell: (rowData) => (
        <IconButton size='small' style={{margin: "auto"}}>
          <VisibilityIcon onClick={handleProfileView(rowData)}/>
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    if (data && data.leaderboard) {
      const formattedRows = data.leaderboard.map((item, index) => ({
        id: index,
        rank: index + 1,
        name: item.user.name,
        username: item.user.username,
        rating: item.rating,
        quizcount: item.quizcount,
      }));
      setRows(formattedRows);
    }
  }, [data]);

  return (
    <Root>
      {!data ? <CircularProgress className="progress-bar" /> : <LeaderBoard rows={rows} profileModal={profileModal} columns={columns} username={username} onCloseModal={() => setProfileModal(false)}/>}
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
