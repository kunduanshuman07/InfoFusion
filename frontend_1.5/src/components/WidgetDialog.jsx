import React from 'react'
import { Dialog, Typography, DialogContent, Box} from '@mui/material'
import styled from 'styled-components'
const WidgetDialog = ({ onCloseModal, text, src, alt}) => {
  return (
    <>
      <Dialog open={true} onClose={onCloseModal}>
        <DialogContent>
          <Root>
            <Box className='dialog-box'>
                <img src={src} alt={alt} width={250} height={150} className='dialog-img'/>
                <Typography className='dialog-text'>{text}</Typography>
            </Box>
          </Root>
        </DialogContent>
      </Dialog>
    </>

  )
}
const Root = styled.div`
  .dialog-box{
    display: flex;
  }
  .dialog-img{
    border-radius: 20px;
  }
  .dialog-text{
   margin: auto;
   margin-left: 20px;
   font-weight: bold;
   color: #0b4e52;
  }
`;
export default WidgetDialog