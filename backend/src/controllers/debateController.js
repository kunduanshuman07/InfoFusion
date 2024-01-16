import Debate from "../models/debateModel.js";
import User from "../models/userModel.js";

export const addDebateTopics = async (req, res) => {
    const { debateId, debateTitle } = req.body;
    try {
        const newDebate = new Debate({ debateId, debateTitle });
        const savedNewDebate = await newDebate.save();
        res.status(200).send(savedNewDebate);
    } catch (error) {
        console.log(error);
        res.send(500).send(error);
    }
}


export const getAllDebates = async (req, res) => {
    try {
        const allDebates = await Debate.find();
        res.status(200).send(allDebates);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getDebate = async (req, res) => {
    const { debateId } = req.body;
    try {
        const findDebate = await Debate.find({ debateId: debateId });
        res.status(200).send(findDebate);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const joinDebateInFavor = async (req, res) => {
    const { debateId, userId } = req.body;
    try {
        const debate = await Debate.findById(debateId);
        const user = await User.findById(userId);
        debate.usersInFavor.push({ userId: userId });
        user.debate.push({ debateId: debateId, debateType: "favor" });
        await user.save();
        await debate.save();
        res.status(200).send({ user, debate });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

export const joinDebateAgainst = async (req, res) => {
    const { debateId, userId } = req.body;
    try {
        const debate = await Debate.findById(debateId);
        const user = await User.findById(userId);
        debate.usersAgainst.push({ userId: userId });
        user.debate.push({ debateId: debateId, debateType: "against" });
        await user.save();
        await debate.save();
        res.status(200).send({ user, debate });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

export const pinStatementInFavor = async (req, res) => {
    const { debateId, userId, statement } = req.body;
    try {
        const debate = await Debate.findById(debateId);
        const user = await User.findById(userId);
        debate.statementsInFavor.push({ userId: userId, statement: statement, upvotes: 0 });
        const userDebate = user.debate.find(instance => instance.debateId == debateId);
        userDebate.statements.push({ statement: statement });
        await debate.save();
        await user.save();
        res.status(200).send({ user, debate });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const pinStatementAgainst = async (req, res) => {
    const { debateId, userId, statement } = req.body;
    try {
        const debate = await Debate.findById(debateId);
        const user = await User.findById(userId);
        debate.statementsAgainst.push({ userId: userId, statement: statement, upvotes: 0 });
        const userDebate = user.debate.find(instance => instance.debateId == debateId);
        userDebate.statements.push({ statement: statement });
        await debate.save();
        await user.save();
        res.status(200).send({ user, debate });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllPinnedStatements = async (req, res) => {
    const { debateId } = req.body;
    try {
        const debate = await Debate.findById(debateId);
        const inFavorStatements = [];
        const againstStatements = []
        await Promise.all(debate.statementsInFavor?.map(async (statement) => {
            const user = await User.findById(statement.userId);
            const statementText = statement.statement;
            inFavorStatements.push({ debateUser: user, statementText: statementText });
        }));
        await Promise.all(debate.statementsAgainst?.map(async (statement) => {
            const user = await User.findById(statement.userId);
            const statementText = statement.statement;
            inFavorStatements.push({ debateUser: user, statementText: statementText });
        }));
        res.status(200).send({inFavorStatements, againstStatements});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const upvoteStatement = async (req, res) => {

}


export const getAllActiveDebates = async (req,res) => {
    const {userId} = req.body;
    try {
        const user = await User.findById(userId);
        let activeDebates = [];
        await Promise.all(user.debate?.map(async (statement) => {
            const debate = await Debate.findById(statement.debateId);
            debate.status==='Active' && activeDebates.push({debate: debate, motion: statement.debateType});
        }));
        res.status(200).send(activeDebates);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}