import { Box, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import WidgetDialog from './WidgetDialog';
const WidgetItem = ({ src, alt, text,  }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => {
        setOpenModal(true);
    }
    const handleClose = () => {
        setOpenModal(false);
    }
    return (
        <Root>
            <Box className="images">
                <img src={src} alt={alt} height={100} width={150} className='img' onClick={handleModalOpen} />
            </Box>
            <Typography className='image-text'>{alt}</Typography> 
            {openModal && <WidgetDialog onCloseModal={handleClose} src={src} alt={alt} text={text}/>}
        </Root>
    )
}
const Root = styled.div`
display: flex;
flex-direction: column;
.images{
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    display: flex;
    width: 150px;
    height: 100px;
    border-radius: 20px;
}
.image-text{
    margin: 5px auto 5px auto;
    color:  #0b4e52;
    font-weight: bold;
    text-decoration: underline;
}
.img{
   margin: auto;
   border-radius: 20px;
   &:hover{
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.4);
   }
}
.icon-text{
    font-size: 14px;
}
`
export default WidgetItem

