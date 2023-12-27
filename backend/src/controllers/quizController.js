import express from "express";
import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";
export const quizAddByAdmin = async (req, res) => {
    const { questions } = req.body;
    try {
        const newQuiz = new Quiz({ questions });
        const savedNewQuiz = await newQuiz.save();
        res.status(200).send(savedNewQuiz);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const latestQuiz = async (req, res) => {
    try {
        const latestQuizDetails = await Quiz.findOne().sort({ createdAt: -1 }).exec();
        res.status(200).send(latestQuizDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const updateUserQuizData = async (req, res) => {
    const { quizId, score, userId, iqr, dateOfQuiz, scoreCard } = req.body;
    console.log(quizId, score, userId, iqr, dateOfQuiz, scoreCard);
    try {
        const user = await User.findById(userId);
        user.rating = user.rating+iqr;
        if(user.rating> user.highestRating){
            user.highestRating = user.rating;
        }
        await user.save();
        const updatedUser = await User.updateOne(
            { _id: userId },
            {
                $push: {
                    quizzes: {
                        quizId: quizId,
                        score: score,
                        rating: iqr,
                        dateOfQuiz: dateOfQuiz,
                        scorecard: scoreCard,
                    },
                },
            }
        );
        const finalUser = await User.findById(userId);
        const updatedQuiz = await Quiz.updateOne(
            { _id: quizId },
            {
                $push: {
                    users: {
                        userId: userId,
                        score: score,
                        iqr: iqr,
                    },
                },
            }
        )
        const finalQuiz = await Quiz.findById(quizId);
        res.status(200).send(finalUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getLeaderBoard = async (req, res) => {
    const { quizId } = req.body;
    try {
        const quiz = await Quiz.findById(quizId);
        const userIds = quiz.users.map(user => user.userId);
        const usersDetails = await User.find({ _id: { $in: userIds } });
        const leaderboard = usersDetails.map(userDetail => ({
            userId: userDetail._id,
            username: userDetail.username,
            iqr: quiz.users.find(user => user.userId.equals(userDetail._id)).iqr,
        }));
        leaderboard.sort((a, b) => b.iqr - a.iqr);
        res.status(200).send({ leaderboard });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
