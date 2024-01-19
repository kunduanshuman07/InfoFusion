import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    IconButton, Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import CloseIcon from "@mui/icons-material/Close"
import styled from "styled-components"
import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import ConfettiComp from "./ConfettiComp"
import TimerIcon from '@mui/icons-material/Timer';
const QuizDialog = ({ onCloseModal }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [answer, setAnswer] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [quizId, setQuizId] = useState('');
    const [iqrChanged, setIqrChanged] = useState(false);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [iqr, setIqr] = useState(0);
    const [weightedScore, setWeightedScore] = useState(0);
    const [attemptedQuestions, setAttemptedQuestions] = useState([]);
    const [timer, setTimer] = useState(60 * 10);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            if(timer === 0) {
                setShowScore(true);
            }
        }, 1000);
        return () => clearInterval(timerInterval);
        
    }, [timer]);
    const handleLeaderboard = () => {
        onCloseModal();
        navigate('/playground/quiz/leaderboard')
    }
    const handleScorecards = () => {
        onCloseModal();
        navigate('/playground/quiz/scorecards')
    }
    const handleRadioChange = (event) => {
        setAnswer(event.target.value)
    }
    useEffect(() => {
        const fetchQuizData = async () => {
            const { data } = await axios.get('http://localhost:3000/quiz/latest-quiz');
            setQuestions(data.questions);
            setQuizId(data._id);
        }
        fetchQuizData();
    }, [])
    const submitQuiz = async () => {
        const quizData = {
            quizId, score, userId: user._id, iqr, dateOfQuiz: new Date(), scoreCard: attemptedQuestions
        }
        const { data, status } = await axios.patch('http://localhost:3000/quiz/update-user-quiz-data', quizData);
        console.log(data, status);
    }
    useEffect(() => {
        if (showScore) {
            const calculatedIQR = weightedScore * 4 + score;
            setIqr(calculatedIQR);
            setIqrChanged(true);
        }
    }, [score, showScore, weightedScore]);
    useEffect(() => {
        if (iqrChanged) {
            submitQuiz();
        }
    }, [iqrChanged]);
    const getWeightage = (type) => {
        switch (type) {
            case '1':
                return 0.5;
            case '2':
                return 0.75;
            case '3':
                return 1;
            case '4':
                return 1.5;
            default:
                return 0;
        }
    }
    const handleSkip = () => {

    }
    const handleContinue = () => {
        const skipped = answer === '' ? true : false;
        const nextQuestion = currentQuestion + 1;
        const correctOption = questions[currentQuestion].options.find(option => option.isCorrect);
        if (!skipped && correctOption.optionText === answer) {
            const weight = getWeightage(questions[currentQuestion].type);
            setScore(prevScore => prevScore + 1);
            setWeightedScore(prevWeightedScore => prevWeightedScore + weight);
        } else if (!skipped) {
            const weight = getWeightage(questions[currentQuestion].type);
            setWeightedScore(prevWeightedScore => prevWeightedScore - weight);
        }
        const attempt = {
            question: questions[currentQuestion].questionText,
            yourAnswer: !skipped ? answer : "",
            correctOption: correctOption.optionText,
            type: questions[currentQuestion].type,
            points: correctOption.optionText === answer ? 1 : 0,
        }
        setAttemptedQuestions((prevAttempts) => [...prevAttempts, attempt]);
        if (nextQuestion < questions.length  && timer!==0) {
            setCurrentQuestion(nextQuestion);
            setAnswer('');
        } else {
            setShowScore(true);
        }
    };



    const getCategoryLabel = (type) => {
        switch (type) {
            case '1':
                return 'Easy';
            case '2':
                return 'Medium';
            case '3':
                return 'Hard';
            case '4':
                return 'Misc';
            default:
                return 'Unknown';
        }
    };
    const progressValue = questions ? ((currentQuestion + 1) / questions.length) * 100 : 0;
    return (
        <Dialog open={true} onClose={onCloseModal} fullScreen>
            <DialogTitle
                sx={{
                    backgroundColor: "#d7e7fa",
                    display: "flex"
                }}
            >
                {!showScore && <Button style={{ backgroundColor: "#0072e5", color: "white", textTransform: "none" }}>Category: {getCategoryLabel(questions[currentQuestion]?.type)}</Button>}
                {!showScore && <Button startIcon={<TimerIcon/>} style={{marginLeft: "430px", marginRight: "auto", backgroundColor: "White", color: "#444444", fontWeight: "bold", textTransform: "none"}} variant="contained">{formatTime(timer)} Left</Button>}
                <IconButton onClick={onCloseModal} style={{ backgroundColor: "white", color: "#444444" }} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{ backgroundColor: "#d7e7fa" }}>
                <Root>
                    {showScore ?
                        <Box className='score-container'>
                            <ConfettiComp />
                            <Typography className="greet-text">Congratulations ! You have completed Today's Quiz.</Typography>
                            <Box className='score'>
                                <Typography className="score-text1">Score : {score}/20</Typography>
                                <Typography className="score-text2">Individual Quiz Rating : {iqr}</Typography>
                            </Box>
                            <Box className='footer-btn'>
                                <Button className="leaderboard-btn" onClick={handleLeaderboard}>
                                    Check Leaderboard
                                </Button>
                                <Button className="scorecards-btn" onClick={handleScorecards}>
                                    Check Scorecard
                                </Button>
                            </Box>
                        </Box> :
                        <Box className='quiz-container'>
                            <Box className='question-box'>
                                <Typography className="question-text">
                                    {questions && questions[currentQuestion]?.questionText}
                                </Typography>
                            </Box>
                            <Box className='option-box'>
                                <FormControl className="option-form">
                                    <RadioGroup value={answer} onChange={handleRadioChange}>
                                        {questions && questions[currentQuestion]?.options.map((option, index) => (
                                            <>
                                                <FormControlLabel value={option.optionText} control={<Radio />} label={option.optionText} className="options" />
                                            </>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box className='footer'>
                                <Button className="skip-btn" onClick={handleSkip}>Skip</Button>
                                <Box className='bar'>
                                    <LinearProgress variant="determinate" className='progress' color="success" value={progressValue} />
                                    <Typography className="question-count">Q.{progressValue / 5}/20</Typography>
                                </Box>
                                <Button className="continue-btn" onClick={handleContinue}>Continue</Button>
                            </Box>
                        </Box>}
                </Root>
            </DialogContent>
        </Dialog>
    );
};

const Root = styled.div`
    .quiz-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .question-box{
        margin: auto;
        margin-top: 20px;
    }
    .question-text{
        font-weight: bold;
        font-size: 23px;
    }
    .option-box{
        margin: auto;
        margin-top: 20px;
    }
    .options{
        background-color: white;
        margin-top: 14px;
        border-radius: 20px;
        padding: 2px 30px 2px 30px;
    }
    .footer{
        background-color: white;
        width: 110%;
        display: flex;
        margin-top: 600px;
        height: 70px;
        position: fixed;
        margin-left: -23px;
    }
    .bar{
        display: flex;
        background-color: #d7e7fa;
        width: 320px;
        height: 50px;
        border-radius:10px;
        padding: 15px 0px;
        margin-top: 10px;
        margin-left: 110px;
    }
    .progress{
        width: 200px;
        margin: auto;
        height: 8px;
        border-radius: 20px;
    }
    .continue-btn{
        margin-right: auto;
        margin-left: 110px;
        width: 130px;
        background-color: green;
        height: 40px;
        color: white;
        font-weight: bold;
        margin-top: 15px;
        &:hover{
            background-color: #029e0f;
        }
        
    }
    .skip-btn{
        margin-left: 230px;
        width: 130px;
        background-color: #ddd;
        height: 40px;
        color: #444444;
        font-weight: bold;
        margin-top: 15px;
        &:hover{
            background-color: #A5A5A5;
        }
    }
    .question-count{
        margin-right: 20px;
        margin-top: -3px;
    }
    .score-container{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        background-color: white;
        padding: 20px;
        border-radius: 20px;
    }
    .score{
        display: flex;
        margin: auto;
    }
    .score-text1{
        font-size: 20px;
        background-color: #0072e5;
        padding: 20px;
        color: white;
        font-weight: bold;
        border-radius: 20px;
        text-align: center;
        margin-left: 20px;
    }
    .score-text2{
        font-size: 20px;
        background-color: #0072e5;
        color: white;
        font-weight: bold;
        padding: 20px;
        border-radius: 20px;
        text-align: center;
        margin-left: 20px;
    }
    .greet-text{
        font-size: 23px;
        background-color: pink;
        font-weight: bold;
        color: #444444;
        padding: 20px;
        border-radius: 20px;
        margin-bottom: 20px;
        text-align: center;
        width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    .footer-btn{
        display: flex;
        margin: 30px auto 20px auto;
    }
    .leaderboard-btn{
        background-color: #d7e7fa;
        color: #444444;
        font-weight: bold;
        border-radius: 20px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
        text-transform: none;
        padding: 5px 15px 5px 15px;
    }
    .scorecards-btn{
        background-color: #d7e7fa;
        color: #444444;
        margin-left: 20px;
        font-weight: bold;
        border-radius: 20px;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
        text-transform: none;
        padding: 5px 15px 5px 15px;
    }
`

export default QuizDialog;
