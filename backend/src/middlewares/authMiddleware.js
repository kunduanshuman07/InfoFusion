import jwt from "jsonwebtoken";
const JWT_SECRET='infofusionsuperhardkey'

export const verifyToken = async(req,res,next) => {
    try {
        let token = req.header('Authorization');
        if(!token){
            res.status(403).send("Access Denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).send(error);
    }
}