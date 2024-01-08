import React, { useState } from "react";
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
const QuizDialog = ({ onCloseModal }) => {
    const [answer, setAnswer] = useState('');
    const handleRadioChange = (event) => {
        setAnswer(event.target.value)
    }
    return (
        <Dialog open={true} onClose={onCloseModal} fullScreen>
            <DialogTitle
                sx={{
                    backgroundColor: "#d7e7fa",
                    display: "flex"
                }}
            >
                <Button style={{ backgroundColor: "#0072e5", color: "white", textTransform: "none" }}>Category: Easy</Button>
                <Typography style={{ margin: "auto", fontWeight: "bold", color: "#444444", fontSize: "23px", justifyContent: "center" }}></Typography>
                <IconButton onClick={onCloseModal} style={{ backgroundColor: "white", color: "#444444" }} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{ backgroundColor: "#d7e7fa" }}>
                <Root>
                    <Box className='container'>
                        <Box className='question-box'>
                            <Typography className="question-text">
                                Who is the Prime Minister of India?
                            </Typography>
                        </Box>
                        <Box className='option-box'>
                            <FormControl className="option-form">
                                <RadioGroup value={answer} onChange={handleRadioChange}>
                                    <FormControlLabel value="Narendra Modi" control={<Radio />} label="Narendra Modi" className="options" />
                                    <FormControlLabel value="Rahul Gandhi" control={<Radio />} label="Rahul Gandhi" className="options" />
                                    <FormControlLabel value="Arvind Kejriwal" control={<Radio />} label="Arvind Kejriwal" className="options" />
                                    <FormControlLabel
                                        value="Mamta Banerjee"
                                        control={<Radio />}
                                        label="Mamta Banerjee"
                                        className="options"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box className='footer'>
                            <Button className="skip-btn">Skip</Button>
                            <Box className='bar'>
                                <LinearProgress variant="determinate" className='progress' color="success" />
                                <Typography className="question-count">1/10</Typography>
                            </Box>
                            <Button className="continue-btn">Continue</Button>
                        </Box>
                    </Box>
                </Root>
            </DialogContent>
        </Dialog>
    );
};

const Root = styled.div`
    .container{
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
`

export default QuizDialog;
