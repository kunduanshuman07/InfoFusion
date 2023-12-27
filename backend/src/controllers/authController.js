import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';
const JWT_SECRET='infofusionsuperhardkey'
export const register = async (req, res) => {
    const { name, email, password, username, age } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name, email, password: hashPassword, username, age
        });
        const savedNewUser = await newUser.save();
        console.log(savedNewUser);
        res.status(200).send(savedNewUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: "User does not exist."
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials."
            });
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET);
        delete user.password;
        res.status(200).send({ token, user });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmVjZjc3YjQxZWJiOGI4NDI4NzMyZiIsImlhdCI6MTcwMTc2MTQ1OH0.1-_odLXCcUdDdJ7UrY-RwQbHZWPUFg_NV1MZId0gP4g