import User from "../models/user_model";
//import BaseController from "./baseController";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
//import auth_middleware from "../common/auth_middleware";

const register = async (req: Request, res: Response) => {
    if (req.body.email == "") {
        res.status(400).send("Missing email");
        console.log("Missing email");
    }
    else if (req.body.password == "") {
        res.status(400).send("Missing password");
        console.log("Missing password");
    }
    else if (req.body.name == "") {
        res.status(400).send("Missing name");
        console.log("Missing name");
    }
    else if (req.body._id == "") {
        res.status(400).send("Missing id");
        console.log("Missing id");
    }
    else {
        try {
            let user = await User.findOne({email: req.body.email});
            if (user) {
                res.status(400).send("Email already in use: " + req.body.email);
                console.log("Email already in use");
            }
            user = await User.findOne({ _id: req.body._id });
            if (user) {
                res.status(400).send("id already in use");
                console.log("id already in use");
            }
            else {
                const newUser = await User.create({
                    _id: req.body._id,
                    name: req.body.name,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
                    avatar_url: ""
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
    if (req.body.email == "") {
        console.log("Missing email");
        return res.status(400).send("Missing email");
    }
    else if (req.body.password == "") {
        console.log("Missing password");
        return res.status(400).send("Missing password");
    }
    else {
        try {
            const user = await User.findOne({ email: req.body.email});
            if (user == null) {
                console.log("Wrong email");
                return res.status(400).send("Wrong email or password");
            }
            else if (!await bcrypt.compare(req.body.password, user.password)) {
                console.log("Wrong password");
                return res.status(400).send("Wrong email or password");
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
                console.log("Login: " + user._id)
                console.log({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                await user.save()
                return res.status(200).send({
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
    console.log('refresh')
    console.log(req.headers['refreshtoken'])
    const oldrefreshToken = req.headers['refreshtoken']
    if (oldrefreshToken == null) {
        console.log('0')
        res.status(401).send("Missing token");
    }
    else {
        jwt.verify(oldrefreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, userInfo: { _id: string }) => {
            console.log('1')
            if (error) {
                console.log('2')
                return res.status(403).send("Invalid token");
            }
            else {
                console.log('3')
                try {
                    const user = await User.findById(userInfo._id);
                    if (user == null || user.tokens == null) {
                        if (user.tokens != null) {
                            console.log('5')
                            user.tokens = [];
                            await user.save();
                        }
                        return  res.status(403).send("Invalid token");
                    }
                    else {
                        console.log('6')
                        const { accessToken, refreshToken } = generateTokens(user._id.toString());
                        user.tokens = []
                        user.tokens.push(refreshToken);
                        await user.save();
                        //console.log(user.tokens)
                        //console.log(refreshToken)
                        console.log({ accessToken: accessToken, refreshToken: refreshToken });
                        return res.status(200).send({
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
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
    const token = req.headers['accesstoken']
    console.log("12541")
    if (token == null) {
        console.log("Missing token");
        res.status(401).send("Missing token");
    }
    else {
        console.log("123")
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async () => {
            console.log(req.body.user)
            const userId = req.body.user._id
            const user = await User.findById(userId)
            try {
                if (user == null) {
                    console.log("3")
                    res.status(403).send("Invalid request");
                }
                else {
                    console.log("2")
                    user.tokens = []
                    await user.save();
                    res.status(200).send("Logged out");
                }
 
            } catch {
                console.log("1")
                res.status(403).send("403")
            }
        });
    }
}

export default {register,login,logout,refresh}

