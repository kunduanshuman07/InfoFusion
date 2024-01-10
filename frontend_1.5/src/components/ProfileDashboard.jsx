import { Box, IconButton, Avatar, Button, Typography, LinearProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LineChart } from '@mui/x-charts/LineChart';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { badgeDecider } from '../utils/BadgeDecider';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
const ProfileDashboard = () => {
    const { userId } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [iqrRow, setIqrRow] = useState([]);
    const [seriesRow, setSeriesRow] = useState([]);
    const [overallRatingRow, setOverallRatingRow] = useState([]);
    const [overallRatingSeries, setOverallRatingSeries] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [easyAnswers, setEasyAnswers] = useState(0);
    const [mediumAnswers, setMediumAnswers] = useState(0);
    const [hardAnswers, setHardAnswers] = useState(0);
    const [miscAnswers, setMiscAnswers] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [maxIqr, setMaxIqr] = useState(0);
    const [maxRating, setMaxrating] = useState(0);
    const [rating, setRating] = useState(0);
    const [badgeColor, setBadgeColor] = useState('');
    const [badgeLabel, setBadgeLabel] = useState('');
    const [badgeAverage, setBadgeAverage] = useState('');
    useEffect(() => {
        const fetchDashboard = async () => {
            const userData = {
                userId: userId ? userId : user._id
            }
            const { data } = await axios.post('http://localhost:3000/user/user-dashboard', userData);
            const xAxisData = data.user.quizzes.map((quiz, index) => index + 1);
            const seriesData = data.user.quizzes.map(quiz => quiz.rating);
            const overallRatingdata = data.user.quizzes.map(quiz => quiz.overallRating);
            setIqrRow(xAxisData);
            setSeriesRow(seriesData);
            setOverallRatingRow(xAxisData);
            setOverallRatingSeries(overallRatingdata);
            setCorrectAnswers(data.dashboardData.correctAnswers);
            setHardAnswers(data.dashboardData.hardAnswers);
            setMiscAnswers(data.dashboardData.miscAnswers);
            setEasyAnswers(data.dashboardData.easyAnswers);
            setMediumAnswers(data.dashboardData.mediumAnswers);
            setQuizCount(data.dashboardData.quizcount);
            setMaxIqr(data.dashboardData.maxiqr);
            setMaxrating(data.dashboardData.maxRating);
            setRating(data.dashboardData.rating);
            const badgeCategory = badgeDecider(data.user.quizzes);
            setBadgeColor(badgeCategory.hexColor);
            setBadgeLabel(badgeCategory.label);
            setBadgeAverage(badgeCategory.finalAverage);
        }
        fetchDashboard();
    }, [])
    const easyProgress = (easyAnswers / (quizCount * 3)) * 100;
    const mediumProgress = (mediumAnswers / (quizCount * 3)) * 100;
    const hardProgress = (hardAnswers / (quizCount * 2)) * 100;
    const miscProgress = (miscAnswers / (quizCount * 2)) * 100;
    return (
        <Root>
            <Box className='container'>
                <Box className='left-container'>
                    <Box className='left-top-container'>
                        <IconButton color="inherit" size='large'>
                            <Avatar alt={user.name} src={`http://localhost:3000/userImages/${user.picturePath}`} className='avatar-style' variant='square' />
                        </IconButton>
                        <Box className='texts'>
                            <Typography className='username'>{user.username}</Typography>
                            <Typography className='rank'>Rank 45</Typography>
                        </Box>
                    </Box>
                    <Button className='edit-profile'>Edit Profile</Button>
                </Box>
                <Box className='right-container'>
                    <Box className='top-container'>
                        <Box className='t-left-container'>
                            <Box className='line-charts'>
                                <LineChart
                                    xAxis={[{ data: iqrRow }]}
                                    series={[
                                        {
                                            data: seriesRow,
                                            label: "Individual Quiz Rating",
                                            color: "#7d37a1",
                                        },
                                    ]}
                                    width={300}
                                    height={150}
                                />
                                <Box className='description'>
                                    <Typography className='header'>'IQR'</Typography>
                                    <Typography className='desc'>Individual Quiz Rating defines the ratings obtained in a single quiz.</Typography>
                                </Box>
                            </Box>
                            <Box className='leftc-text'>
                                <Typography className='iqr-textone'>Max IQR <span className='spans'>{maxIqr}</span></Typography>
                                <Typography className='iqr-texttwo'>Min IQR <span className='spans'>-10</span></Typography>
                            </Box>
                        </Box>
                        <Box className='t-right-container'>
                            <Box className='line-charts'>
                                <LineChart
                                    xAxis={[{ data: overallRatingRow }]}
                                    series={[
                                        {
                                            data: overallRatingSeries,
                                            label: "Rating",
                                            color: 'Green',
                                        },
                                    ]}
                                    width={300}
                                    height={150}
                                />
                                <Box className='description'>
                                    <Typography className='header'>'Rating'</Typography>
                                    <Typography className='desc'>Rating defines the overall Rating acquired till date.</Typography>
                                </Box>
                            </Box>
                            <Box className='rightc-text'>
                                <Typography className='rating-textone'>Current Quiz Rating <spans className='spans'>{rating}</spans></Typography>
                                <Typography className='rating-texttwo'>Max Quiz Rating <spans className='spans'>{maxRating}</spans></Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='bottom-container'>
                        <Box className='b-left-container'>
                            <Box className='circle'>
                                <Typography className='circle-text'>Correct Answers</Typography>
                                <Button className='circle-btn'>{correctAnswers} Correct</Button>
                            </Box>
                            <Box className='progress-bars'>
                                <Box className='progress-box'>
                                    <Typography className='progress-text'>Easy <span className='diff'>{easyAnswers}</span><span className='slash'> /{quizCount * 3}</span></Typography>
                                    <LinearProgress className='progress' color='success' variant='determinate' value={easyProgress} />
                                </Box>
                                <Box className='progress-box'>
                                    <Typography className='progress-text'>Medium <span className='diff'>{mediumAnswers}</span><span className='slash'> /{quizCount * 3}</span></Typography>
                                    <LinearProgress className='progress' color='info' variant='determinate' value={mediumProgress} />
                                </Box>
                                <Box className='progress-box'>
                                    <Typography className='progress-text'>Hard <span className='diff'>{hardAnswers}</span><span className='slash'> /{quizCount * 2}</span></Typography>
                                    <LinearProgress className='progress' color='warning' variant='determinate' value={hardProgress} />
                                </Box>
                                <Box className='progress-box'>
                                    <Typography className='progress-text'>Misc <span className='diff'>{miscAnswers}</span><span className='slash'> /{quizCount * 2}</span></Typography>
                                    <LinearProgress className='progress' color='error' variant='determinate' value={miscProgress} />
                                </Box>
                            </Box>
                        </Box>
                        <Box className='b-right-container'>
                            <Typography className='badge-intro'>Badge</Typography>
                            <Box className='badge-holo'>
                                <Box className='text'>
                                    <Typography className='badge-text' style={{ backgroundColor: badgeColor, color: "white" }}>"{badgeLabel}"</Typography>
                                    <Typography className='badge-average'><span className='average-span' style={{ color: badgeColor }}>'IF'</span>   Rating : <span className='average-span' style={{ color: badgeColor }}>{badgeAverage}</span></Typography>
                                </Box>
                                <IconButton className='badge-icon'>
                                    <MilitaryTechIcon style={{ color: badgeColor }} className='badge' />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Root>
    )
}

const Root = styled.div`
.container{
    display: flex;
    width: 95%;
    margin: 90px 35px 0px 30px;

}
.left-container{
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
    width: 25%;
    height: 180px;
    border-radius: 10px;
    display: flex;
    flex-direction : column
}
.right-container{
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-left: 20px;
}
.top-container{
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 200px;
    border-radius: 10px;
    display : flex;
    padding: 5px;
}
.bottom-container{
    display: flex;
    margin-top: 20px;
}
.b-left-container{
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
    width: 50%;
    height: 200px;
    border-radius: 10px;
    display: flex;
}
.b-right-container{
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.1);
    width: 50%;
    height: 200px;
    border-radius: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction : column;
}
.left-top-container{
    display: flex;
    flex-direction: row;
}
.avatar-style{
    width: 90px;
    height: 90px;
    border-radius: 10px;
}
.texts{
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-top: 20px;
    margin-left: 10px;
}
.username{
    font-weight: bold;
    color: #444444;
}
.rank{
    margin-top: 20px;
    color: #444444;
}
.edit-profile{
    color: #0072e5;
    background-color: #d7e7fa;
    width: 80%;
    margin: 5px auto;
    font-weight: bold;
    border-radius: 10px;
}
.t-left-container{
    display : flex;
    flex-direction: column;
    border-right: 1px solid #d7e7fa;
    width: 50%;
}
.t-right-container{
    display : flex;
    flex-direction: column;
    width: 50%;
}
.line-charts{
    display: flex;
    margin: auto;
}
.leftc-text{
    display: flex;
    margin: 5px auto 5px auto;
    border-top: 1px solid #d7e7fa;
}
.iqr-textone{
    color: #444444;
    margin-right: 20px;
}
.iqr-texttwo{
    color: #444444;
}
.rightc-text{
    display: flex;
    margin: 5px auto 5px auto;
    border-top: 1px solid #d7e7fa;
}
.spans{
    font-weight: bold;
    margin-left: 5px;
}
.rating-textone{
    color: #444444;
    margin-right: 20px;
}
.rating-texttwo{
    color: #444444;
}
.description{
    background-color: #0072e5;
    width: 80px;
    border-radius: 20px;
    height: 130px;
}
.header{
    font-size: 12px;
    color: white;
    font-weight: bold;
    text-decoration: underline;
    padding: 10px 10px 0px 10px;
    text-align: center;
}
.desc{
    font-size: 10px;
    color: white;
    padding: 0px 10px;
    text-align: center;
}
.circle{
    display: flex;
    flex-direction: column;
}
.circle-btn{
    width: 100px;
    border: 5px solid #d7e7fa;
    border-radius: 100px;
    padding: 20px;
    text-transform: none;
    font-weight: bold;
    margin: 25px 30px;
    font-size: 15px;
}
.circle-text{
    margin-top: 10px;
    margin-left: 26px;
    font-size: 13px;
    font-weight: bold;
    color: #444444;
}
.progress-bars{
    display: flex;
    flex-direction: column;
}
.progress-box{
    margin-top: 17px;
    margin-left: 20px;
}
.progress{
    width: 220px;
    border-radius: 20px;
    height: 7px;
}
.progress-text{
    font-size: 12px;
    color: #444444;
}
.diff{
    font-weight: bold;
    font-size: 13px;
    color: #444444;
    margin-left: 4px;
}
.slash{
    font-size: 11px;
}
.badge-text{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 20px;
    padding: 3px 2px 3px 2px;
    margin-bottom: 5px;
}
.badge-icon{
    width: 40%;
    &:hover{
        background-color: white;
    }
}
.badge{
    font-size: 100px;
    font-weight: bold;
}
.text{
    width: 60%;
    margin: auto;
    border-right: 2px solid #d7e7fa;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
}
.badge-average{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #444444;
}
.average-span{
    font-size: 16px;
}
.badge-holo{
    display: flex;
    margin-top: 15px;
}
.badge-intro{
 font-size: 13px;
 font-weight: bold;
 color: #444444;
 text-align: center;
 margin-top: 5px;
}
`

export default ProfileDashboard