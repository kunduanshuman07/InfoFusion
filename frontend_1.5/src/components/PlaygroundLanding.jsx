import { Box, Typography } from '@mui/material'
import React from 'react'
const PlaygroundLanding = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <Box style={{ display: "flex", flexDirection: "column", boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)", width: "90%", marginTop: "60px", borderRadius: "10px", padding: "20px", cursor: "pointer" }}>
                <Box style={{ margin: "auto", borderBottom: "2px solid #d7e7fa" }}>
                    <Typography style={{ color: "#0072e5", fontSize: "24px", fontWeight: "bold" }}>Welcome to The Playground</Typography>
                </Box>
                <Box style={{ display: "flex",flexDirection: "column", marginTop: "-10px", padding: "20px", borderRadius: "20px" }}>
                    <Box style={{backgroundColor: "#d7e7fa", borderRadius: "10px", padding: "10px", marginBottom: "5px"}}>
                        <Typography style={{color: "#444444", textAlign: "center", fontWeight: "bold", fontSize: "14px"}}>Ready for the ultimate playground experience? Click on your desired feature above and let the fun begin! Whether you're a quiz enthusiast or a data-driven learner, we've got something for everyone.</Typography>
                    </Box>
                    <Box style={{display: "flex", marginTop: "5px"}}>
                        <Box style={{ margin: "auto", backgroundColor: "#0072e5", borderRadius: "10px", padding: "20px", marginRight: "5px" }}>
                            <Typography style={{ color: "white", fontSize: "16px", textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>Quiz</Typography>
                            <Typography style={{ color: "white", fontSize: "11px" }}>Test your knowledge and have fun with our interactive quizzes! Click on the "Quiz" tab to embark on a journey of questions designed to challenge and entertain you. Choose your category, answer wisely, and see how you stack up against others.</Typography>
                        </Box>
                        <Box style={{ margin: "auto", backgroundColor: "#0072e5", borderRadius: "10px", padding: "20px" }}>
                            <Typography style={{ color: "white", fontSize: "16px", textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>Leaderboard</Typography>
                            <Typography style={{ color: "white", fontSize: "11px" }}>Compete with fellow players and climb to the top of our Leaderboard! Navigate to the "Leaderboard" section to discover where you stand among the best. Earn points for correct answers and see your name rise through the ranks. Will you become the ultimate champion?</Typography>
                        </Box>
                        <Box style={{ margin: "auto", backgroundColor: "#0072e5", borderRadius: "10px", padding: "20px", marginLeft: "5px" }}>
                            <Typography style={{ color: "white", fontSize: "16px", textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>Scorecards</Typography>
                            <Typography style={{ color: "white", fontSize: "11px" }}>Track your progress and review your performance with the "Scorecards" feature. Dive into detailed statistics, including your quiz history, accuracy, and achievements. The Scorecard provides valuable insights to help you improve and celebrate your successes.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PlaygroundLanding