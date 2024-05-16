import User from "../models/user_model";
import { Iuser } from "../models/user_model";
import BaseController from "./baseController";
import { Request, Response } from "express";
class UserController extends BaseController<Iuser>{
    constructor() {
        super(User);
    }
    async get(req: Request, res: Response) {
        console.log("Get users:")
        super.get(req, res);
    }

    async getbyID(req: Request, res: Response) {
        console.log("Get users by ID:")
        super.getbyID(req, res);
    }

    async put(req: Request, res: Response) {
        console.log("update user:")
        console.log("update post:")
        const filter = { _id: req.params.id };
        const update = {
            name: req.body.name,
            age: req.body.age
        }
        super.put(req, res, filter, update);
    }
    async remove(req: Request, res: Response) {
        console.log("Delete user:")
        super.remove(req, res);
    }
}
export default new UserController();