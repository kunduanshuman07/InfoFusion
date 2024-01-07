import React from 'react'
import FeedIcon from '@mui/icons-material/Feed';
import QuizIcon from '@mui/icons-material/Quiz';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AirplayIcon from '@mui/icons-material/Airplay';
import { Box, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import WidgetItem from './WidgetItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NewsImg from "../assets/News.jpg"
import QuizImg from "../assets/Quiz.jpg"
import DebateImg from "../assets/Debate.jpg"
import OpinionImg from "../assets/Opinion.jpg"
import ConnectImg from "../assets/Connect.jpg"
import ExploreImg from "../assets/Explore.jpg"
const Widgets = () => {
    return (
        <Root>
            <Box className='grid-container'>
                <Typography className='header'>We are all about?</Typography>
                <Grid container spacing={1} className='grid'>
                    <Grid item xs={4}>
                        <WidgetItem icon={<FeedIcon />} text={"Stay informed with daily trending news shorts and audio briefings to start your day on the pulse of current events."} src={NewsImg} alt='News' />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetItem icon={<QuizIcon />} text={"Boost your UPSC General Studies preparation with daily quizzes tailored for aspirants, enhancing your general awareness."} src={QuizImg} alt='Quiz' />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetItem icon={<ViewSidebarIcon />} text={"Engage in insightful debates to expand your knowledge and perspectives on a wide range of topics."} src={DebateImg} alt='Debate' />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetItem icon={<PostAddIcon />} text={"Share your opinions on specific trending issues, fostering a community of diverse perspectives and discussions."} src={OpinionImg} alt='Opinion' />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetItem icon={<AirplayIcon />} text={"Connect with like-minded individuals, fostering a knowledge-sharing community to expand your understanding and network."} src={ConnectImg} alt='Connect' />
                    </Grid>
                    <Grid item xs={4}>
                        <WidgetItem icon={<AirplayIcon />} text={"Embark on a journey of exploration and knowledge acquisition as you surf through curated content designed to expand your understanding of various subjects."} src={ExploreImg} alt='Explore' />
                    </Grid>
                </Grid>

            </Box>
        </Root>
    )
}

const Root = styled.div`
    .grid-container{
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        margin-top: 20px;
        padding-right: 8px;
    }
    .header{
        color: #0b4e52;
        font-weight: bold;
        margin: 10px auto 10px auto;
        font-size: 22px;
        background-color: #c1ddde;
        border-radius: 20px;
        padding: 10px;
    }
    .grid{
        margin: auto;
    }
`

export default Widgets