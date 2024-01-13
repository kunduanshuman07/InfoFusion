import { Box, Button, IconButton, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { ongoingDebateTopics } from "../utils/debateTopics";
import RecommendIcon from '@mui/icons-material/Recommend';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Debate from './Debate';
const DebateRoom = () => {
    const { debateId } = useParams();
    const [debate, setDebate] = useState();
    const [debateModelFavor, setDebateModelFavor] = useState(false);
    const [debateModelAgainst, setDebateModelAgainst] = useState(false);
    const handleJoinFavor = () => {
        setDebateModelFavor(true);
    }
    const handleJoinAgainst = () => {
        setDebateModelAgainst(true);
    }
    const handleClose = () => {
        setDebateModelAgainst(false);
        setDebateModelFavor(false);
    }
    useEffect(() => {
        const debateData = ongoingDebateTopics.find(topic => topic.id === debateId);
        setDebate(debateData)
    }, [])
    return (
        <Root>
            <Box className='container'>
                <Box className='top-container'>
                    <Box className='top-left-container'>
                        <Typography className='debate-id'>Debate Id: #{debate && debate.id}</Typography>
                        <Typography className='debate-header'>Statement: {debate && debate.topicName}</Typography>
                        <Box className='pro-con'>
                            <Box className='pro'>
                                <IconButton>
                                    <HowToRegIcon style={{ color: "#01781b" }} />
                                </IconButton>
                                <Typography className='pro-con-text'>4 In Favor</Typography>
                            </Box>
                            <Box className='con'>
                                <IconButton>
                                    <WrongLocationIcon style={{ color: "#96050c" }} />
                                </IconButton>
                                <Typography className='pro-con-text'>6 Against</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='top-right-container'>
                        <Box className='details'>
                            <IconButton>
                                <RecommendIcon style={{ fontSize: "30px", color: "#0072e5" }} />
                            </IconButton>
                            <Typography className='detail-text'><span style={{ fontWeight: "bold" }}>700</span> Likes</Typography>
                        </Box>
                        <Box className='details'>
                            <IconButton>
                                <SurroundSoundIcon style={{ fontSize: "30px", color: "#01264a" }} />
                            </IconButton>
                            <Typography className='detail-text'><span style={{ fontWeight: "bold" }}>10</span> Iterations</Typography>
                        </Box>
                        <Box className='details'>
                            <Rating value={4} size='medium' style={{ marginTop: "10px", marginLeft: "18px" }} readOnly />
                        </Box>
                    </Box>
                </Box>
                <Box className='bottom-container'>
                    <Button startIcon={<HowToRegIcon />} className='favor-btn' onClick={handleJoinFavor}>Join In Favor</Button>
                    <Button startIcon={<WrongLocationIcon />} className='against-btn' onClick={handleJoinAgainst}>Join Against</Button>
                </Box>
            </Box>
            {debateModelFavor && <Debate onCloseModal={handleClose} motion="Favor" debate={debate} />}
            {debateModelAgainst && <Debate onCloseModal={handleClose} motion="Against" debate={debate} />}
        </Root>
    )
}

const Root = styled.div`
.container{
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    cursor: pointer;
}
.top-container{
    display: flex;
    height: 200px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    padding: 10px;
}
.bottom-container{
    display: flex;
    margin: auto;
    margin-top: 30px;
}
.top-left-container{
    border-right: 2px solid #d7e7fa;
    width: 70%;
    padding: 10px;
}
.top-right-container{
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top:20px;
}
.details{
    display: flex;
}
.detail-text{
    margin-left: 10px;
    margin-top: 9px;
}
.debate-id{
    font-size: 16px;
    font-weight: bold;
    color: #A5A5A5;
}
.debate-header{
    font-size: 24px;
    font-weight: bold;
    color: #444444;
    margin-bottom: 30px;
}
.pro-con{
    display: flex;
}
.pro{
    display: flex;
}
.con{
    display: flex;
    margin-left: 20px;
}
.pro-con-text{
    margin-top: 8px;
    font-weight: bold;
}
.favor-btn{
    background-color: #01781b;
    color: white;
    width: 150px;
    border-radius: 20px;
    padding: 10px;
    text-transform: none;
    font-weight: bold;
    &:hover{
        background-color: #033b14;
    }
}
.against-btn{
    background-color: #96050c;
    color: white;
    width: 150px;
    border-radius: 20px;
    padding: 10px;
    text-transform: none;
    font-weight: bold;
    margin-left: 30px;
    &:hover{
        background-color: #5c0d07;
    }
}
`

export default DebateRoom