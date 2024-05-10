import Student from "../models/student_model";
import {Istudent} from "../models/student_model";
import BaseController from "./baseController";
import { Request, Response } from "express";
class StudentController extends BaseController<Istudent>{
    constructor() {
        super(Student);
    }
    async get(req: Request, res: Response) {
        console.log("Get students:")
        super.get(req, res);
    }
    async getbyID(req: Request, res: Response) {
        console.log("Get students by ID:")
        super.getbyID(req, res);
    }
    async post(req: Request, res: Response) {
        console.log("Post student:")
        super.post(req, res);
    }
    async put(req: Request, res: Response) {
        console.log("update student:")
        console.log("update post:")
        const filter = { _id: req.params.id };
        const update = {
            name: req.body.name,
            age: req.body.age
        }
        super.put(req, res, filter, update);
    }
    async remove(req: Request, res: Response) {
        console.log("Delete student:")
        super.remove(req, res);
    }
}
export default new StudentController();