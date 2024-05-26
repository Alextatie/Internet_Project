import request from "supertest";
import appInnit from "../app";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { Express } from "express";
import User from "../models/user_model";
let app: Express;

const testUser = {
    _id: "666666",
    name: "Bon Jovi",
    email: "Bonj@gmail.com",
    password: "123456",
}

let tuser
let accessToken

// add "--coverage" in package.json on test to check coverage
// --runInBand
///// add failed tests, like bad users etc, no user in database etc. check coverage folder

beforeAll(async() => {
    app = await appInnit();
    console.log("beforeAll");
    await Post.deleteMany();
    await User.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    tuser = await request(app).post("/auth/login").send(testUser);
    accessToken = tuser.body.accessToken;
});

afterAll(async() => {
    mongoose.connection.close();
    await console.log("afterAll");
});

describe("Post tests", () => {
    const posts =
        [
            "Aaaaa aaaaa aaaaa",
            "Bbbbb bbbbb bbbbb",
            "Ccccc ccccc ccccc",
            "Ddddd ddddd ddddd",
            "Eeeee eeeee eeeee"
        ]
    const ids = [0,1] 

    test("/Post (post)", async () => {
        let res;
        for (let i = 0; i < 5; i++) {
            res = await request(app).post("/post").send({
                message: posts[i],
                sender: testUser._id,
                senderName: testUser.name,
                sender_avatar: "x",
                type: "1"
            }).set('accessToken', accessToken);
            ids[i] = res.body._id;
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe(posts[i]);
            //expect(res.body.sender).toBe(res.body._id);
        }
        res = await request(app).get("/Post").set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(5);
    });

    test("/post (get)", async () => {
        const res = await request(app).get("/post").set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(5);
    });

    test("/Post/:id (get)", async () => {
        const res = await request(app).get("/post/" + ids[0]).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe(posts[0]);
        //expect(res.body.sender).toBe(res.body._id);
    });

    test("/Post?Sender= (get)", async () => {

        const res = await request(app).get("/post?sender=" + testUser._id).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body[0].message).toBe(posts[0]);
        //expect(res.body[0].sender).toBe(res.body[0]._id);
    });


    test("/Post/:id (put)", async () => {
         
        const res = await request(app).put("/post/" + ids[3]).send({

            "message": posts[3] + " updated",
        }).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/post/" + ids[3]).set('accessToken', accessToken)
        expect(updated.body.message).toBe(posts[3] + " updated");
    });

    test("/post/:id (delete)", async () => {
        const res = await request(app).delete("/post/" + ids[2]).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/post/" + ids[2]).set('accessToken', accessToken)
        expect(updated.body[0]).toBe(undefined)
        console.log(updated.body[0])
    });

});