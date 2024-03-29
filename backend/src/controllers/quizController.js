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

export const rawQuizDetailing = async(req,res) => {
    const {userId} = req.body;
    try {
        const latestQuizDetails = await Quiz.findOne().sort({ createdAt: -1 }).exec();
        const userEnability = !!latestQuizDetails.users.find(user => user.userId.toString() === userId);
        const quizzes = await Quiz.find();
        const quizCount = quizzes.length;
        res.status(200).send({quizCount, userEnability});
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
                        iqr: iqr,
                        dateOfQuiz: dateOfQuiz,
                        scorecard: scoreCard,
                        overallRating: user.rating,
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

export const getAllPastQuizzes = async (req,res) =>{
    try {
        const allQuizzes = await Quiz.find();
        const formattedRows = allQuizzes.map((quiz) => ({
            createdAt: quiz.createdAt,
            _id: quiz._id,
        }));
        res.status(200).send(formattedRows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getQuizData = async(req, res) => {
    const {quizId} = req.body;
    try {
        const quizData = await Quiz.findById(quizId);
        res.status(200).send(quizData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

