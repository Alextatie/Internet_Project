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
    async exists(req: Request, res: Response) {
        try {
            let item;
            if (req.query._id) {
                item = await this.itemModel.find({ _id: req.query._id });
            }
            else if (req.query.email) {
                item = await this.itemModel.find({ email: req.query.email });
            }
            if (item.length > 0) {
                return res.status(200).send(true);
            }
            else {
                return res.status(200).send(false);
            }

        } catch (error) {
            console.log("empty input");
            return res.status(400).send(error);
        }
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