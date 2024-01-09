import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom'; 
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import styled from 'styled-components';
import CasinoIcon from '@mui/icons-material/Casino';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';

const PlaygroundAppBar = () => {
  return (
    <Root>
      <AppBar position="static" className='container'>
        <Box className='list-container'>
          <ListItem
            to='/playground/quiz'
            component={NavLink}
            style={({ isActive }) =>
              isActive ? { color: '#444444', } : { color: '#444444' }
            }
            className='list-item'
          >
            <IconButton className='list-icon'><CasinoIcon /></IconButton>
            <Typography className='list-text'>Quiz</Typography>
          </ListItem>
          <ListItem
            to='/playground/quiz/leaderboard'
            component={NavLink}
            style={({ isActive }) =>
              isActive ? { color: '#444444', backgroundColor: 'white' } : { color: '#444444' }
            }
            className='list-item'
          >
            <IconButton className='list-icon'><LeaderboardIcon /></IconButton>
            <Typography className='list-text'>Leaderboard</Typography>
          </ListItem>
          <ListItem
            to='/playground/quiz/scorecards'
            component={NavLink}
            style={({ isActive }) =>
              isActive ? { color: '#444444', backgroundColor: 'white' } : { color: '#444444' }
            }
            className='list-item'
          >
            <IconButton className='list-icon'><ScoreboardIcon /></IconButton>
            <Typography className='list-text'>Scorecards</Typography>
          </ListItem>
        </Box>
      </AppBar>
    </Root>
  );
};

const Root = styled.div`
  .container {
    border-radius: 5px;
    width: 90%;
    height: 50px;
    background-color: #d7e7fa;
  }
  .list-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-item {
    width: 25%;
    border-radius: 5px;
    height: 30px;
    margin: 10px auto 0px auto;
  }
  .list-icon {
    color: #444444;
    margin-left: auto;
  }
  .list-text {
    color: #444444;
    margin-right: auto;
    font-weight: bold;
  }
`;

export default PlaygroundAppBar;
