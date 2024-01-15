import { Box, Grid, Tooltip, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import RecommendIcon from '@mui/icons-material/Recommend';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const DebateTopics = () => {
    const navigate = useNavigate();
    const [ongoingDebates, setOngoingDebates] = useState([]);
    const handleDebateRoom = (topicId) => {
        navigate(`/debate/debate-topics/${topicId}`)
    }
    useEffect(()=>{
        const fetchDebates = async() => {
            const {data} = await axios.get('http://localhost:3000/debate/all-debates');
            setOngoingDebates(data);
        }
        fetchDebates();
    },[])
    return (
        <Root>
            <Box className='container'>
                <Typography style={{backgroundColor: "#0072e5", color: "white", textAlign: "center", padding: "10px", borderRadius: "10px", marginTop: "10px", width: "51%",fontWeight: "bold", margin: "auto"}}>Choose from the topics below and Click to enter !</Typography>
                <Grid container spacing={3} className='topic-grid'>
                    {ongoingDebates.map((topic, index) => (
                        <Grid item xs={6} key={index} className='grid-item' onClick={()=>handleDebateRoom(topic.debateId)}>
                            <Box className='items'>
                                <Typography className='topic-name'>{topic.debateTitle}</Typography>
                                <Typography className='topic-id'>#{topic.debateId}</Typography>
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
    margin-top: 10px;
    cursor: pointer;
}
.topic-grid{
}
.grid-item{
    margin-top: 10px;
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