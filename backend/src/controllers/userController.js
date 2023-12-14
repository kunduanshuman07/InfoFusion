import express from "express";
import User from "../models/userModel.js";
export const updateProfile = async (req, res) => {
    const { id, phone, age, gender, education, university, employment, city, state, pincode } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                phone,
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

        res.status(200).send({updatedUser});
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