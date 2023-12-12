import express from "express";
import User from "../models/userModel.js";
export const updateProfile = async (req, res) => {
    const { id, phone, age, gender, education, employment, city, state, pincode } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                phone,
                age,
                gender,
                education,
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