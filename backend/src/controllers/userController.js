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
    const { key, value } = req.body;
    const { userid } = req.params;

    try {
        const allowedFields = ['name', 'gender', 'age', 'location', 'education', 'employment', 'username', 'email', 'github', 'linkedin'];
        if (!allowedFields.includes(key)) {
            return res.status(400).send({ error: 'Invalid field for update' });
        }
        const updateObject = { [key]: value };
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            updateObject,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ error: 'Error updating the profile' });
        }

        res.status(200).send({ updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
export const uploadUserImage = async (req, res) => {
    const { id } = req.body;
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
            if (user.quizzes.length !== 0) {
                const rating = user.rating;
                leaderboardData.push({
                    user: user,
                    rating: rating,
                    quizcount: user.quizzes.length,
                });
            }
        });
        leaderboardData.sort((a, b) => b.rating - a.rating);
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

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).send(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


export const getIFNetwork = async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    try {
        const allUsers = await User.find();
        const ifNetwork = allUsers?.map(user => ({
            User: user,
            isConnection: user?.connections?.some(instance => instance.userId.toString() === userId),
        }));

        const taggedNetwork = ifNetwork.map(item => ({
            ...item,
            tag: item.isConnection ? 'Connection' : 'Not Connected',
        }));

        res.status(200).send(taggedNetwork);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


export const getMyConnections = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        const userConnections = user.connections;
        let myConnections = [];
        await Promise.all(userConnections.map(async (users) => {
            const connectionuser = await User.findById(users.userId);
            myConnections.push({ connectedUser: connectionuser });
        }));
        res.status(200).send(myConnections);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
export const getRequestedConnections = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        const userConnections = user.requestedConnections;
        let requestedConnections = [];
        await Promise.all(userConnections.map(async (users) => {
            const connectionuser = await User.findById(users.userId);
            requestedConnections.push({ connectedUser: connectionuser });
        }));
        res.status(200).send(requestedConnections);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
export const getConnectionRequests = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        const userConnections = user.connectionRequests;
        let myConnections = [];
        await Promise.all(userConnections.map(async (users) => {
            const connectionuser = await User.findById(users.userId);
            myConnections.push({ connectedUser: connectionuser });
        }));
        res.status(200).send(myConnections);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const approveConnectionRequests = async (req, res) => {
    const { actualUserId, connectionUserId } = req.body;
    try {
        const userone = await User.findById(actualUserId);
        const usertwo = await User.findById(connectionUserId);
        userone.connectionRequests = userone.connectionRequests.filter(request => request.userId.toString() !== connectionUserId);
        usertwo.requestedConnections = usertwo.requestedConnections.filter(request => request.userId.toString() !== actualUserId);
        userone.connections.push({ userId: connectionUserId });
        usertwo.connections.push({ userId: actualUserId });
        await userone.save();
        await usertwo.save();
        res.status(200).send(userone);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const sendConnectionRequests = async (req, res) => {
    const { actualUserId, connectionUserId } = req.body;
    try {
        const userone = await User.findById(actualUserId);
        const usertwo = await User.findById(connectionUserId);
        userone.requestedConnections.push({ userId: connectionUserId });
        usertwo.connectionRequests.push({ userId: actualUserId });

        await userone.save();
        await usertwo.save();

        res.status(200).send(userone);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const deleteConnectionRequests = async (req, res) => {
    const { actualUserId, connectionUserId } = req.body;
    try {
        const userone = await User.findById(actualUserId);
        const usertwo = await User.findById(connectionUserId);
        userone.connectionRequests = userone.connectionRequests.filter(request => request.userId.toString() !== connectionUserId);
        usertwo.requestedConnections = usertwo.requestedConnections.filter(request => request.userId.toString() !== actualUserId);

        await userone.save();
        await usertwo.save();

        res.status(200).send(userone);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


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
        let miniqr = 0;
        if (user && user.quizzes && user.quizzes.length > 0) {
            user.quizzes.map((quiz) => {
                if (quiz.iqr !== undefined && quiz.iqr > maxiqr) {
                    maxiqr = quiz.iqr;
                }
                if (quiz.iqr !== undefined && quiz.iqr < miniqr) {
                    miniqr = quiz.iqr;
                }
            });
        } else {
            console.error("User or user.quizzes is undefined or empty.");
        }
        const solvedQuestions = quizCount * 10;
        let correctanswers = 0;
        let hardanswers = 0;
        let miscanswers = 0;
        let easyanswers = 0;
        let mediumanswers = 0
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
                        else if (scores.type === "1") {
                            easyanswers = easyanswers + 1;
                        }
                        else if (scores.type === "2") {
                            mediumanswers = mediumanswers + 1;
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
            easyAnswers: easyanswers,
            mediumAnswers: mediumanswers,
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

export const getUserScorecards = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).send("User not found");
        }
        const scorecardData = [];
        user.quizzes.forEach((quiz) => {
            scorecardData.push(quiz);
        })
        res.status(200).send(scorecardData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const fetchMessages = async (req, res) => {
    const { userId, secondUserId } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById(userId);
        const secondUser = await User.findById(secondUserId);

        const myMessages = user.messages
            .filter(message => String(message.userId) === String(secondUserId))
            .map(message => ({ type: 'yourmessage', message }));

        const yourMessages = secondUser.messages
            .filter(message => String(message.userId) === String(userId))
            .map(message => ({ type: 'mymessage', message }));

        const allMessages = [...myMessages, ...yourMessages]
            .sort((b, a) => b.message.messageTime - a.message.messageTime);

        res.status(200).send(allMessages);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


export const fetchAllMessages = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        const uniqueUserIds = new Set();
        const allMessagedUsers = [];
        user.messages?.forEach((message) => {
            const secondUserId = String(message.userId);
            uniqueUserIds.add(secondUserId);
        });
        for (const secondUserId of uniqueUserIds) {
            const secondUser = await User.findById(secondUserId);
            allMessagedUsers.push({ secondUser });
        }

        res.status(200).send(allMessagedUsers);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};



export const messageSeenUpdate = async (req, res) => {
    const { messageId, userId } = req.body;
    try {
        const user = await User.findById(userId);
        const messageToUpdate = user.messages.find((message) => message._id.toString() === messageId);
        messageToUpdate.messageType = 'read';
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const sendMessage = async (req, res) => {
    const { userId, secondUserId, message, messageTime } = req.body;
    try {
        const firstUser = await User.findById(userId);
        const secondUser = await User.findById(secondUserId);
        secondUser.messages.push({ userId: userId, messageText: message, messageTime: messageTime, messageType: "unread" });
        await secondUser.save();
        res.status(200).send({ firstUser, secondUser });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const fetchNotifications = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        const userNotifications = user.notifications;
        userNotifications.sort((a, b) => b.notificationTime - a.notificationTime);
        res.status(200).send(userNotifications);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}