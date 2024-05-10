import User from "../models/user_model";
//import BaseController from "./baseController";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
//import auth_middleware from "../common/auth_middleware";

const register = async (req: Request, res: Response) => {
    if (req.body.email == null) {
        res.status(400).send("Missing email");
        console.log("Missing email");
    }
    else if (req.body.password == null) {
        res.status(400).send("Missing password");
        console.log("Missing password");
    }
    else {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user) {
                res.status(400).send("Email already in use");
                console.log("Email already in use");
            }
            else {
                const newUser = await User.create({
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password,await bcrypt.genSalt(10))
                });
                res.status(200).send("Registered:\n" + newUser);
                console.log("Registered:\n" + newUser);
            }
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message);
        }
    }
}

const generateTokens = (userId: string): { accessToken: string, refreshToken: string } => {
    const accessToken = jwt.sign({
        _id: userId
    }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
    });

    const refreshToken = jwt.sign({
        _id: userId,
        salt: Math.random()
    }, process.env.REFRESH_TOKEN_SECRET);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

const login = async (req: Request, res: Response) => {
    if (req.body.email == null) {
        res.status(400).send("Missing email");
        console.log("Missing email");
    }
    else if (req.body.password == null) {
        res.status(400).send("Missing password");
        console.log("Missing password");
    }
    else {
        try {
            const user = await User.findOne({ email: req.body.email});
            if (user==null) {
                res.status(400).send("Wrong email or password");
                console.log("Wrong email");
            }
            else if (!await bcrypt.compare(req.body.password, user.password)) {
                res.status(400).send("Wrong email or password");
                console.log("Wrong password");
            }
            else {
                const { accessToken, refreshToken } = generateTokens(user._id.toString());
                if (user.tokens == null) {
                    user.tokens = [refreshToken]
                }
                else {
                    //user.tokens = user.tokens.filter(token => token != refreshToken);
                    user.tokens.push(refreshToken)
                }
                await user.save()
                res.status(200).send({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                console.log({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message);
        }
    }

}

const refresh = async (req: Request, res: Response) => {
    const oldrefreshToken = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (oldrefreshToken == null) {
        res.status(401).send("Missing token");
    }
    else {
        jwt.verify(oldrefreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, userInfo: { _id: string }) => {
            if (error) {
                console.log(error.message);
                res.status(403).send("Invalid token");
            }
            else {
                try {
                    const user = await User.findById(userInfo._id);
                    if (user == null || user.tokens == null || !user.tokens.includes(oldrefreshToken)) {
                        if (user.tokens != null) {
                            user.tokens = [];
                            await user.save();
                        }
                        res.status(403).send("Invalid token");
                    }
                    else {
                        const { accessToken, refreshToken } = generateTokens(user._id.toString());
                        user.tokens = user.tokens.filter(token => token != oldrefreshToken);
                        user.tokens.push(refreshToken);
                        await user.save();
                        res.status(200).send({
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                        console.log({ accessToken: accessToken, refreshToken: refreshToken });
                    }
                } catch (error) {
                    console.log(error)
                    res.status(400).send(error.message);
                }
            }
        
        });
    }
}

const logout = async (req: Request, res: Response) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (token == null) {
        console.log("Missing token");
        res.status(401).send("Missing token");
    }
    else {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(error, userInfo) => {
            if (error) {
                console.log(error.message);
                res.status(403).send("Invalid request");
            }
            else {
                const userId= userInfo._id
                try {
                    const user = await User.findById(userId)
                    if (user == null) {
                        console.log(error.message);
                        res.status(403).send("Invalid request");
                    }
                    else if (!user.tokens.includes(token)) {
                        user.tokens = []
                        await user.save();
                        console.log(error.message);
                        res.status(403).send("Invalid request");
                    }
                    else {
                        user.tokens.splice(user.tokens.indexOf(token), 1)
                        await user.save()
                        console.log("we are here: " + user.tokens);
                        res.status(200).send(user.tokens);
                    }
                } catch {
                    res.status(403).send("403")
                }
            }
        });
    }
}

export default {register,login,logout,refresh}

