import express from "express";
import User from "../models/userModel.js";
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


        const dashboardData = {
            rating: rating,
            maxRating: maxRating,
            quizcount: quizCount,
            maxiqr: maxiqr,
        }
        res.status(200).send({dashboardData:dashboardData});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteAccount = async(req,res)=>{
    const {userid} = req.params;
    try {
        const response = await User.deleteOne({_id: userid});
        res.status(200).send(response.acknowledged);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}