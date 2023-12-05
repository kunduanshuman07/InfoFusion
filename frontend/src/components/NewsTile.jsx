import { Card, Grid } from '@mui/material'
import React from 'react'
import styled from 'styled-components';

const NewsTile = () => {
  return (
    <Root>
        <Card className='card-content'>
          <Grid container>
            <Grid container xs={6}>
              <Grid container xs={12}>
                Grid1
              </Grid>
              <Grid container xs={6}>Grid2</Grid>
              <Grid container xs={6}>Grid3</Grid>
            </Grid>
          </Grid>
        </Card>
    </Root>
  )
}

const Root = styled.div`
    .card-content{
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #086D67 ;
    }
`
export default NewsTile