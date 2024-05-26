import request from "supertest";
import appInnit from "./app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "./models/user_model";
import Post from "./models/post_model";

let app: Express;

// databaseloader

beforeAll(async () => {
    app = await appInnit();
    console.log("beforeAll");
    await User.deleteMany();
    await Post.deleteMany();
});

afterAll(async () => {
    mongoose.connection.close();
    await console.log("afterAll");
});

describe("Database Loader", () => {

    const users =
        [["111111", "Alex Smith", "alexs@gmail.com", "123456"],
        ["222222", "John Anderson", "johna@gmail.com", "123456"],
        ["333333", "Bill Williams", "billw@gmail.com", "123456"],
        ["444444", "James Davis", "jamesd@gmail.com", "123456"],
        ["555555", "Bibi Miller", "bibim@gmail.com", "123456"]];

    const posts =
        [
            "Aaaaa aaaaa aaaaa",
            "Bbbbb bbbbb bbbbb",
            "Ccccc ccccc ccccc",
            "Ddddd ddddd ddddd",
            "Eeeee eeeee eeeee"
        ]

    const login = {
        email: users[0][2],
        password: users[0][3]
    }

    const full_login = {
        _id: users[0][0],
        name: users[0][1],
        email: users[0][2],
        password: users[0][3]
    }

    test("/register (post)", async () => {
        let testUser
        for (let i = 0; i < 5; i++) {
            testUser = {
                _id: users[i][0],
                name: users[i][1],
                email: users[i][2],
                password: users[i][3],
            }
            await request(app).post("/auth/register").send(testUser);
        }

        const res = await request(app).post("/auth/login").send(login);
        const accessToken = res.body.accessToken

        for (let i = 0; i < 5; i++) {
            await request(app).post("/post").send({
                message: posts[i],
                sender: full_login._id,
                senderName: full_login.name,
                sender_avatar: "x",
                type: "1"
            }).set('accessToken', accessToken);
        }
    });
});