//imports

//express
import express, { Express } from "express";
const app = express();

//dotenv
import dotenv from "dotenv";

dotenv.config();
//body parser
import bodyParser from "body-parser";

//mongoose
import mongoose from "mongoose";
/*const db = mongoose.connection
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('connected to mongo'));*/

//routes
import studentRoute from "./routes/student_routes";
import postRoute from "./routes/post_routes";
import authRoute from "./routes/auth_routes";


const initApp = () => {
    const promise = new Promise<Express>((resolve) => {
        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
        db.once("open", () => console.log("Connected to Mongo"));
        mongoose.connect(process.env.DATABASE_URL).then(() => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use("/student", studentRoute);
            app.use("/post", postRoute);
            app.use("/auth", authRoute);
            resolve(app);
        })
    });
    return promise;
};

//exporting this file
export default initApp;