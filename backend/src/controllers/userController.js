import express from "express";
import User from "../models/userModel.js";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../backend/public/userImages");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export const upload = multer({ storage: storage });

export const updateProfile = async (req, res) => {
    const { id, age, gender, education, university, employment, city, state, pincode } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                age,
                gender,
                education,
                university,
                employment,
                city,
                state,
                pincode,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ error: "Error updating the profile" });
        }

        res.status(200).send({ updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }
}
export const uploadUserImage = async (req, res) => {
    const {id} = req.body;
    const Img = req.file;
    const picturePath = Img.filename;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                picturePath
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ error: "Error updating the UserImage" });
        }

        res.status(200).send({ updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
export const getOverallLeaderboard = async (req, res) => {
    try {
        const allUsers = await User.find();
        let leaderboardData = [];
        allUsers.forEach((user) => {
            const rating = user.rating;
            leaderboardData.push({
                user: user,
                rating: rating,
                quizcount: user.quizzes.length,
            });
        });
        leaderboardData.sort((a, b) => b.rating - a.rating);
        console.log(leaderboardData);
        res.status(200).send({ leaderboard: leaderboardData });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

}

export const userDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId).lean();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



export const userDashboard = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        const rating = user.rating;
        const maxRating = user.highestRating;
        let quizCount;
        if (user && user.quizzes) {
            quizCount = user.quizzes.length;
        } else {
            console.error("User or user.quizzes is undefined.");
        }
        let maxiqr = 0;
        if (user && user.quizzes && user.quizzes.length > 0) {
            user.quizzes.map((quiz) => {
                if (quiz.rating !== undefined && quiz.rating > maxiqr) {
                    maxiqr = quiz.rating;
                }
            });
        } else {
            console.error("User or user.quizzes is undefined or empty.");
        }
        const solvedQuestions = quizCount * 10;
        let correctanswers = 0;
        let hardanswers = 0;
        let miscanswers = 0;
        if (user && user.quizzes.length > 0) {
            const quizzes = user.quizzes;
            quizzes.map((quiz) => {
                const scorecard = quiz.scorecard;
                scorecard.map((scores) => {
                    if (scores.points === 1) {
                        correctanswers = correctanswers + 1;
                        if (scores.type === "3") {
                            hardanswers = hardanswers + 1;
                        }
                        else if (scores.type === "4") {
                            miscanswers = miscanswers + 1;
                        }
                    }
                })

            })
        }
        const dashboardData = {
            username: user.username,
            name: user.name,
            picturePath: user.picturePath,
            rating: rating,
            maxRating: maxRating,
            quizcount: quizCount,
            maxiqr: maxiqr,
            solvedQuestions: solvedQuestions,
            hardAnswers: hardanswers,
            miscAnswers: miscanswers,
            correctAnswers: correctanswers,
        }
        res.status(200).send({ dashboardData: dashboardData, user: user });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteAccount = async (req, res) => {
    const { userid } = req.params;
    try {
        const response = await User.deleteOne({ _id: userid });
        res.status(200).send(response.acknowledged);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}