import { Box, Button, Card, IconButton, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CasinoIcon from '@mui/icons-material/Casino';
import HubIcon from '@mui/icons-material/Hub';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useNavigate } from 'react-router-dom';
import IFLogo from "../assets/InfoFusion.png";
import AppBarComponent from "../components/AppBarComponent";
import { useAuth } from '../context/AuthProvider';
import FlagIcon from '@mui/icons-material/Flag';
const GettingStarted = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleGetStarted = () => {
        if(!auth){
            navigate('/login')
        }
        else{
            navigate('/quiz/current-quiz')
        }
    }

    return (
        <Root>
            <AppBarComponent />
            <Box className='container'>
                <Box className='left-container'>
                        <Box className='intro-container'>
                            <Box className='logo'>
                                <img src={IFLogo} alt='IFlogo' width={130} height={130} />
                            </Box>
                            <Box className='intro'>
                                <Typography className='tag-one'>Quiz, Debate & Connect</Typography>
                                <Typography className='tag-two'>Ignite Knowledge, Stay Aware, </Typography>
                                <Typography className='tag-three'>Forge Meaningful Interactions.</Typography>
                            </Box>
                        </Box>
                        <Typography className='tag-four'>Dive into a dynamic world of knowledge with our engaging quizzes and thought-provoking debates, exploring topics that range from general awareness to current affairs. Connect with like-minded peers in our dedicated section, where you can post, discuss, and forge meaningful connections. Whether you seek intellectual stimulation or camaraderie, our platform is designed to cater to your curiosity, fostering a community that values both learning and connection.</Typography>

                    <Box className='get-started-header'>
                        <Button className='get-started-btn' onClick={handleGetStarted} variant='outlined' startIcon={<FlagIcon/>}>Get Started</Button>
                    </Box>
                </Box>
                <Box className='right-container'>
                    <Card className='quiz-card'>
                        <Typography className='quiz-header'>Quiz</Typography>
                        <Box className='quiz-box'>
                            <Typography className='quiz-desc'>Informative ,Educational, Engaging & Based on Current Affairs</Typography>
                            <IconButton className='quiz-icon' onClick={() => navigate('/quiz/current-quiz')}>
                                <CasinoIcon className='quiz-btn' />
                            </IconButton>
                        </Box>
                    </Card>
                    <Card className='debate-card'>
                        <Typography className='quiz-header'>Debate</Typography>
                        <Box className='debate-box'>
                            <Typography className='quiz-desc'>Argumentative,
                                Persuasive &
                                Discursive</Typography>
                            <IconButton className='debate-icon' onClick={() => navigate('/debate/debate-topics')}>
                                <CampaignIcon className='debate-btn' />
                            </IconButton>
                        </Box>
                    </Card>
                    <Card className='connect-card'>
                        <Typography className='quiz-header'>Connect</Typography>
                        <Box className='connect-box'>
                            <Typography className='quiz-desc'>Link,
                                Join,
                                Unite, &
                                Associate</Typography>
                            <IconButton className='connect-icon' onClick={() => navigate('/connect')}>
                                <HubIcon className='connect-btn' />
                            </IconButton>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Root>
    )
}

const Root = styled.div`
    .container{
        display: flex;
        cursor: pointer;
        padding: 20px;
        margin-top: 90px;
        border-radius: 20px;
    }
    .left-container{
        display: flex;
        flex-direction: column;
        width: 60%;
        margin-top: 10px;
    }
    .intro-container{
        display: flex;
    }
    .logo{
        margin-left: 30px;
    }
    .intro{
        margin-left: 10px;
    }
    .text-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .tag-one{
        font-size: 40px;
        font-weight: bold;
        color: #0072e5;
        text-align: center;
    }
    .tag-two{
        font-size: 30px;
        font-weight: bold;
        color: #444444;
        text-align: center;
    }
    .tag-three{
        font-size: 25px;
        font-weight: bold;
        color: #01264a;
        text-align: center;
    }
    .tag-four{
        font-size: 15px;
        color: #434d5b;
        margin-top: 20px;
        text-align: center;
        border: 2px solid #d7e7fa;
        border-radius: 20px;
        padding: 10px;
        font-weight: bold;
    }
    .right-container{
        width: 40%;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
    }
    .quiz-card{
        height: 100px;
        padding: 10px;
        margin-top: 10px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    .debate-card{
        height: 100px;
        padding: 10px;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
    }
    .connect-card{
        height: 100px;
        padding: 10px;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
    }
    .quiz-box{
        display: flex;
    }
    .quiz-header{
        color: #01264a;
        font-weight: bold;
        font-size: 20px;
    }
    .quiz-desc{
        font-size: 13px;
        margin-top: 10px;
        font-weight: bold;
        color: #444444;
    }
    .quiz-icon{
        margin-top: -20px;
        margin-left: auto;
    }
    .quiz-btn{
        font-size: 50px;
        color: #81099c;
    }
    .debate-box{
        display: flex;
    }
    .debate-icon{
        margin-top: -20px;
        margin-left: auto;
    }
    .debate-btn{
        font-size: 50px;
        color: #9c5714;
    }
    .connect-box{
        display: flex;
    }
    .connect-icon{
        margin-top: -20px;
        margin-left: auto;
    }
    .connect-btn{
        font-size: 50px;
        color: #147333;
    }
    .get-started-header{
        display: flex;
        justify-content: center;
    }
    .get-started-btn{
        margin-left: 20px;
        border-radius: 10px;
        border: 2px solid #0072e5;
        height: 50px;
        font-weight: bold;
        margin-top: 20px;
        width: 200px;
        &:hover{
            background-color: #0072e5;
            color: white;
        }
    }
`

export default GettingStarted