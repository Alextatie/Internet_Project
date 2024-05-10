import request from "supertest";
import appInnit from "../app";
import mongoose from "mongoose";
import post from "../models/post_model";
import { Express } from "express";
import user from "../models/user_model";
let app: Express;
let tuser;
let tsender;
const testUser = {
    email: "Post@gmail.com",
    password: "123456",
    accessToken: null,
    refreshToken: null
}

// add "--coverage" in package.json on test to check coverage
// --runInBand
///// add failed tests, like bad users etc, no user in database etc. check coverage folder

beforeAll(async() => {
    app = await appInnit();
    console.log("beforeAll");
    await post.deleteMany();
    await user.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    tuser = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = tuser.body.accessToken;
    testUser.refreshToken = tuser.body.refreshToken;

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

    test("/post (get)", async () => {
        const res = await request(app).get("/post").set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    });

    test("/Post (post)", async () => {
        let res;
        for (let i = 0; i < 5; i++) {
            res = await request(app).post("/post").send({
                "message": posts[i]
            }).set('Authorization', 'Bearer ' + testUser.accessToken);
            ids[i] = res.body._id;
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe(posts[i]);
            //expect(res.body.sender).toBe(res.body._id);
        }
        tsender = res.body.sender
        res = await request(app).get("/Post").set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(5);
    });

    test("/Post/:id (get)", async () => {
        const res = await request(app).get("/post/" + ids[0]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe(posts[0]);
        //expect(res.body.sender).toBe(res.body._id);
    });

    test("/Post?Sender= (get)", async () => {

        const res = await request(app).get("/post?sender=" + tsender).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body[0].message).toBe(posts[0]);
        //expect(res.body[0].sender).toBe(res.body[0]._id);
    });


    test("/Post/:id (put)", async () => {
         
        const res = await request(app).put("/post/" + ids[3]).send({

            "message": posts[3] + " updated",
        }).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/post/" + ids[3]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(updated.body.message).toBe(posts[3] + " updated");
    });

    test("/post/:id (delete)", async () => {
        const res = await request(app).delete("/post/" + ids[2]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/post/" + ids[2]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(updated.body[0]).toBe(undefined)
        console.log(updated.body[0])
    });

});