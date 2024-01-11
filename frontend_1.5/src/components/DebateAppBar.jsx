import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import { Typography } from '@mui/material';


const DebateAppBar = () => {
  return (
    <Root>
      <AppBar position="fixed" className='container'>
        <Typography className='title-one'>Debate Topics</Typography>
        <Typography className='title-two'>Choose and Click to enter the Room</Typography>
      </AppBar>
    </Root>
  );
};

const Root = styled.div`
  .container {
    border-radius: 5px;
    width: 74%;
    height: 50px;
    background-color: #d7e7fa;
    margin-top: 65px;
    margin-right: 50px;
  }
  .title-one{
    margin: 5px auto 0px auto;
    font-size: 18px;
    color: #01264a;
    font-weight: bold;
  }
  .title-two{
    margin: 0px auto 0px auto;
    color: #444444;
    font-size: 12px;
    font-weight: bold;
  }
`;

export default DebateAppBar;
