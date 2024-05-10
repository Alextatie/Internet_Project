import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const authMiddlewear = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
	if (token == null) {
		console.log("Missing token");
		res.status(401).send("Missing token");
	}
	else {
		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				console.log(error.message);
				res.status(403).send("Invalid token");
			}
			else {
				console.log("works? "+token);
				req.body.user = user;
				next();
			}
		});
	}
}

export default authMiddlewear;