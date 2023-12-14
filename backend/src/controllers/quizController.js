import express from "express";
import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";
export const quizAddByAdmin = async (req, res) => {
    const { title, description, questions } = req.body;
    try {
        const newQuiz = new Quiz({ title, description, questions });
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
    const { quizId, score, userId } = req.body;
    try {
        const updatedUser = await User.updateOne(
            { _id: userId },
            {
                $push: {
                    quizzes: {
                        quizId: quizId,
                        score: score,
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
            username: userDetail.name,
            score: quiz.users.find(user => user.userId.equals(userDetail._id)).score,
        }));
        leaderboard.sort((a, b) => b.score - a.score);
        res.status(200).send({ leaderboard });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const getOverallLeaderboard = async (req, res) => {
    try {
        const allUsers = await User.find();
        let leaderboardData = [];
        allUsers.forEach((user) => {
            const username = user.name;
            user.quizzes.forEach((quiz) => {
                const quizName = quiz.name;
                const score = quiz.score || 0;

                const existingUserIndex = leaderboardData.findIndex((item) => item.user.name === username);

                if (existingUserIndex !== -1) {
                    leaderboardData[existingUserIndex].totalScore += score;
                } else {
                    leaderboardData.push({
                        user: user,
                        totalScore: score,
                    });
                }
            });
        });
        leaderboardData.sort((a, b) => b.totalScore - a.totalScore);
        console.log(leaderboardData);
        res.status(200).send({ leaderboard: leaderboardData });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

}