import request from "supertest";
import appInnit from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import student from "../models/student_model";
import user from "../models/user_model";

let app: Express;
const testUser = {
    email: "Student@gmail.com",
    password: "123456",
    accessToken: null
}

// add "--coverage" in package.json on test to check coverage
// --runInBand
///// add failed tests, like bad users etc, no user in database etc. check coverage folder

beforeAll(async () => {
    app = await appInnit();
    console.log("beforeAll");
    await student.deleteMany();
    await user.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    const res = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = res.body.accessToken;
});

afterAll(async() => {
    mongoose.connection.close();
    await console.log("afterAll");
});

describe("Student tests", () => {
    const students =
        [["Aaa Aaa", "111111111"],
        ["Bbb Bbb", "222222222"],
        ["Ccc Ccc", "333333333"],
        ["Ddd Ddd", "444444444"],
        ["Eee Eee", "555555555"]];

    const ages = [11,22,33,44,55]

    test("/student (get)", async () => {
        const res = await request(app).get("/student").set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    });

    test("/Student (post)", async () => {
        let res;
        for (let i = 0; i < 5; i++){
            res = await request(app).post("/student").send({
                "name": students[i][0],
                "_id": students[i][1],
                "age": ages[i]
            }).set('Authorization', 'Bearer ' + testUser.accessToken);
            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(students[i][0]);
            expect(res.body._id).toBe(students[i][1]);
            expect(res.body.age).toBe(ages[i]);
        }
        res = await request(app).get("/student").set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(5);
    });

    test("/student/:id (get)", async () => {
        const res = await request(app).get("/student/" + students[0][1]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(students[0][0]);
        expect(res.body._id).toBe(students[0][1]);
        expect(res.body.age).toBe(ages[0]);
    });

    test("/student?Name= (get)", async () => {
        const res = await request(app).get("/student?Name=" + students[0][0]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        expect(res.body[0].name).toBe(students[0][0]);
        expect(res.body[0]._id).toBe(students[0][1]);
        expect(res.body[0].age).toBe(ages[0]);
    });


    test("/student/:id (put)", async () => {
        const res = await request(app).put("/student/" + students[3][1]).send({

            "name": students[3][0] +" updated",
            "age": ages[3] +5
        }).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/student/" + students[3][1]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(updated.body.name).toBe(students[3][0] + " updated");
        expect(updated.body.age).toBe(ages[3] +5);
        expect(updated.body._id).toBe(students[3][1]);
    });

    test("/student/:id (delete)", async () => {
        const res = await request(app).delete("/student/" + students[1][1]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(res.statusCode).toBe(200);
        const updated = await request(app).get("/student/" + students[1][1]).set('Authorization', 'Bearer ' + testUser.accessToken)
        expect(updated.body[0]).toBe(undefined)
        console.log(updated.body[0])
    });

});