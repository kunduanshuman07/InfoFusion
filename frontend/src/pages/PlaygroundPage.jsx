import React, { useState, useEffect } from 'react';
import Quiz from '../components/Quiz';
import axios from "axios";
import StartQuiz from '../components/StartQuiz';
import styled from 'styled-components';

const PlaygroundPage = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState();
  const [quizId, setQuizId] = useState();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quiz/latest-quiz');
        const quizID = {
          quizId: response.data._id
        }
        const leaderboardRows = await axios.post('http://localhost:3000/quiz/get-leaderboard', quizID);
        setRows(leaderboardRows.data.leaderboard);
        setQuestions(response.data.questions);
        setQuizId(response.data._id);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);
  return (
    <>
      {
        startQuiz ? <Quiz questions={questions} quizId={quizId} /> : <Root>
          <StartQuiz setStartQuiz={setStartQuiz} quizId={quizId} rows={rows} />
        </Root>
      }

    </>
  );
};
const Root = styled.div`
  
`
export default PlaygroundPage;
