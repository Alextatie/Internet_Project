import request from "supertest";
import appInnit from "../app";
import mongoose from "mongoose";
import User from "../models/user_model";
import { Express } from "express";
//import jest from "@jest/globals"

let app: Express;
const user = {
    "email": "Auth@gmail.com",
    "password": "123456"
}
let accessToken = "";
let refreshToken = "";

const timeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

// add "--coverage" in package.json on test to check coverage
// --runInBand
///// add failed tests, like bad users etc, no user in database etc. check coverage folder
// taskkill /F /IM node.exe to kill running tasks

beforeAll(async () => {

    app = await appInnit();
    console.log("beforeAll");
    await User.deleteMany({ email: user.email });
});

afterAll(async() => {
    mongoose.connection.close();
    await console.log("afterAll");
});

describe("Auth tests", () => {

    test("/register (post)", async () => {
        const res = await request(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    });
    
    test("/login (post)", async () => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = await request(app).get("/student")
            .set('Authorization', 'Bearer ' + accessToken);
        console.log("HERE: "+res2)
        expect(res2.statusCode).toBe(200);
        const res3 = await request(app).get("/student")
            .set('Authorization', 'Bearer ' + accessToken + "a");
        expect(res3.statusCode).not.toBe(200);
    });

    jest.setTimeout(10000);
    test("/refresh (get)", async () => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
        const res2 = await request(app).get("/auth/refresh")
           .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        expect(res2.statusCode).toBe(200);
        accessToken = res2.body.accessToken
        refreshToken = res2.body.refreshToken
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = await request(app).get("/student")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);

    });

    test("/refresh (get) with expired token", async () => {
        const res = await request(app).post("/auth/login").send(user);
        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
        await timeout(6000);
        const res2 = await request(app).get("/student")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res2.statusCode).not.toBe(200);

        const res3 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        accessToken = res3.body.accessToken
        refreshToken = res3.body.refreshToken
        const res4 = await request(app).get("/student")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res4.statusCode).toBe(200);

    });

    test("/refresh (get) violation", async () => {
        const res = await request(app).post("/auth/login").send(user);
        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
        await timeout(6000);
        const res2 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        accessToken = res2.body.accessToken
        const newRefreshToken = res2.body.refreshToken
        const res3 = await request(app).get("/student")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
        const res4 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        expect(res4.statusCode).not.toBe(200);
        const res5 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + newRefreshToken)
            .send();
        expect(res5.statusCode).not.toBe(200);
    });

    test("/logout (get)", async () => {

        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
        const res2 = await request(app).get("/post").set('Authorization', 'Bearer ' + accessToken)
        expect(res2.statusCode).toBe(200);
        const res3 = await request(app).get("/auth/logout").send(user);
        expect(res3.statusCode).not.toBe(200);
        accessToken = res3.body.accessToken
        const res4 = await request(app).get("/post").set('Authorization', 'Bearer ' + accessToken)
        expect(res4.statusCode).not.toBe(200);
    });

});