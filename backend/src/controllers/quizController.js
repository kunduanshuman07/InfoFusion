import express from "express";
import Quiz from "../models/quizModel.js";
export const quizAddByAdmin = async(req, res) =>{
    const {title, description, questions} = req.body;
    try {
        const newQuiz = new Quiz({title, description, questions});
        const savedNewQuiz = await newQuiz.save();
        res.status(200).send(savedNewQuiz);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const latestQuiz = async(req,res) => {
    try {
        const latestQuizDetails = await Quiz.findOne().sort({createdAt: -1}).exec();
        res.status(200).send(latestQuizDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}