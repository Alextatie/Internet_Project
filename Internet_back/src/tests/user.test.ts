import request from "supertest";
import appInnit from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;

// add "--coverage" in package.json on test to check coverage
// --runInBand
///// add failed tests, like bad users etc, no user in database etc. check coverage folder

beforeAll(async () => {
    app = await appInnit();
    console.log("beforeAll");
    await User.deleteMany();
});

afterAll(async () => {
    mongoose.connection.close();
    await console.log("afterAll");
});

const timeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

describe("user tests", () => {

    const users =
        [["111111", "Alex Smith", "alexs@gmail.com", "123456"],
        ["222222", "John Anderson", "johna@gmail.com", "123456"],
        ["333333", "Bill Williams", "billw@gmail.com", "123456"],
        ["444444", "James Davis", "jamesd@gmail.com", "123456"],
        ["555555", "Bibi Miller", "bibim@gmail.com", "123456"]];

    const testUser = {
        email: users[0][2],
        password: users[0][3],
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
            const res = await request(app).post("/auth/register").send(testUser);
            expect(res.statusCode).toBe(200);
        }
    });

    test("/login (post)", async () => {

        const res = await request(app).post("/auth/login").send(testUser);
        expect(res.statusCode).toBe(200);
        const accessToken = res.body.accessToken
        const refreshToken = res.body.refreshToken
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = await request(app).get("/user")
            .set('accessToken', accessToken);
        expect(res2.statusCode).toBe(200);
        const res3 = await request(app).get("/user")
            .set('accessToken', accessToken + "a");
        expect(res3.statusCode).not.toBe(200);
        await request(app).get("/auth/logout").send(testUser);
    });

    jest.setTimeout(10000);
    test("/refresh (get)", async () => {

        const res = await request(app).post("/auth/login").send(testUser);
        expect(res.statusCode).toBe(200);
        let accessToken = res.body.accessToken
        let refreshToken = res.body.refreshToken
        const res2 = await request(app).get("/auth/refresh")
            .set('refreshToken' , refreshToken)
            .send();
        expect(res2.statusCode).toBe(200);
        accessToken = res2.body.accessToken
        refreshToken = res2.body.refreshToken
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = await request(app).get("/user")
            .set('accessToken' , accessToken);
        expect(res3.statusCode).toBe(200);
        await request(app).get("/auth/logout").send(testUser);
    });

    test("/refresh (get) with expired token", async () => {
 
        const res = await request(app).post("/auth/login").send(testUser);
        let accessToken = res.body.accessToken
        let refreshToken = res.body.refreshToken
        await timeout(6000);
        const res2 = await request(app).get("/user")
            .set('accessToken', accessToken);
        expect(res2.statusCode).not.toBe(200);

        const res3 = await request(app).get("/auth/refresh")
            .set('refreshToken', refreshToken)
            .send();
        accessToken = res3.body.accessToken
        refreshToken = res3.body.refreshToken
        const res4 = await request(app).get("/user")
            .set('accessToken', accessToken);
        expect(res4.statusCode).toBe(200);
        await request(app).get("/auth/logout").send(testUser);
    });

     test("/logout (get)", async () => {
         console.log("Logout test")
        const res = await request(app).post("/auth/login").send(testUser);
        expect(res.statusCode).toBe(200);
        let accessToken = res.body.accessToken
        const res2 = await request(app).get("/user").set('accessToken', accessToken)
        expect(res2.statusCode).toBe(200);
         const res3 = await request(app).get("/auth/logout").set('accessToken', accessToken)
         expect(res3.statusCode).toBe(200);
         if (!res3.body.accessToken == undefined) {
             accessToken = res3.body.accessToken
         }
         else {
             accessToken = " "
         }
         const res4 = await request(app).get("/user").set('accessToken', accessToken)
        expect(res4.statusCode).not.toBe(200);
    });

    test("/user (get)", async () => {
        let res = await request(app).post("/auth/login").send(testUser);
        const accessToken = res.body.accessToken
        res = await request(app).get("/user").set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(5);
        await request(app).get("/auth/logout").send(testUser);
    });


    test("/user/:id (get)", async () => {
        let res = await request(app).post("/auth/login").send(testUser);
        const accessToken = res.body.accessToken
        res = await request(app).get("/user/" + users[0][0]).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(users[0][1]);
        expect(res.body._id).toBe(users[0][0]);
        await request(app).get("/auth/logout").send(testUser);
    });

    test("/user?Name= (get)", async () => {
        let res = await request(app).post("/auth/login").send(testUser);
        const accessToken = res.body.accessToken
        res = await request(app).get("/user?Name=" + users[0][1]).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body[0].name).toBe(users[0][1]);
        expect(res.body[0]._id).toBe(users[0][0]);
        await request(app).get("/auth/logout").send(testUser);
    });


    test("/user/:id (put)", async () => {
        let res = await request(app).post("/auth/login").send(testUser);
        const accessToken = res.body.accessToken
        res = await request(app).put("/user/" + users[2][0]).send({

            name: users[2][1] + " updated",
            flag: 1
        }).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/user/" + users[2][0]).set('accessToken', accessToken)
        expect(updated.body.name).toBe(users[2][1] + " updated");
        expect(updated.body._id).toBe(users[2][0]);
        await request(app).get("/auth/logout").send(testUser);
    });

    test("/user/:id (delete)", async () => {
        let res = await request(app).post("/auth/login").send(testUser);
        const accessToken = res.body.accessToken
        res = await request(app).delete("/user/" + users[1][0]).set('accessToken', accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/user/" + users[1][0]).set('accessToken', accessToken)
        expect(updated.body[0]).toBe(undefined)
    });
});