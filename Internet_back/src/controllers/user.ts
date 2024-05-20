import User from "../models/user_model";
import { Iuser } from "../models/user_model";
import BaseController from "./baseController";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
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
        let update
        switch (req.body.flag) {
            case 1:
                update = {
                    name: req.body.name
                }
                break;
            case 2:
                update = {
                    email: req.body.email
                }
                break;
            case 3:
                update = {
                    password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
                }
                break;
        }
        super.put(req, res, filter, update);
    }
    async remove(req: Request, res: Response) {
        console.log("Delete user:")
        super.remove(req, res);
    }
}
export default new UserController();