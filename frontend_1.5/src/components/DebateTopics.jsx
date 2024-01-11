import { Box, Grid, Tooltip, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { ongoingDebateTopics } from "../utils/debateTopics";
import RecommendIcon from '@mui/icons-material/Recommend';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
const DebateTopics = () => {
    const navigate = useNavigate();
    const handleDebateRoom = (topicId) => {
        navigate(`/debate/${topicId}`)
    }
    return (
        <Root>
            <Box className='container'>
                <Grid container spacing={3} className='topic-grid'>
                    {ongoingDebateTopics.map((topic, index) => (
                        <Grid item xs={6} key={index} className='grid-item' onClick={()=>handleDebateRoom(topic.id)}>
                            <Box className='items'>
                                <Typography className='topic-name'>{topic.topicName}</Typography>
                                <Typography className='topic-id'>#{topic.id}</Typography>
                                <Box className='icons'>
                                    <Tooltip title='Liked'>
                                        <RecommendIcon className='icon-btn-one' />
                                    </Tooltip>
                                    <Typography className='counts'>123</Typography>
                                    <Tooltip title='Active Users'>
                                        <GroupIcon className='icon-btn-two'/>
                                    </Tooltip>
                                    <Typography className='counts'>73</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Root>
    )
}

const Root = styled.div`
.container{
    margin-top: 60px;
    cursor: pointer;
}
.topic-grid{
    
}
.grid-item{
    
}
.items{
    border-radius: 10px;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.05);
    &:hover{
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    }
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    border: 2px solid #d7e7fa;
    padding: 10px;
}
.icons{
    display: flex;
    margin: auto;
}
.topic-name{
    color: #444444;
    text-align: center;
    margin-top: 15px;
    font-weight: bold;
}
.topic-id{
    color: #A5A5A5;
    text-align: center;
    font-size: 13px;
    margin-bottom: 20px;
}
.icon-btn-one{
    color: #0072e5;
}
.icon-btn-two{
    margin-left: 25px;
    color: #01264a;
}
.counts{
    
}
`

export default DebateTopics