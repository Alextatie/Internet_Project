import Post from "../models/post_model";
import { Ipost } from "../models/post_model";
import BaseController from "./baseController";
import { Request, Response} from "express";

class PostController extends BaseController<Ipost>{
    constructor() {
        super(Post);
    }
    async get(req: Request, res: Response) {
        console.log("Get posts:")
        super.get(req, res);
    }
    async getbyID(req: Request, res: Response) {
        console.log("Get posts by ID:")
        super.getbyID(req, res);
    }
    async post(req: Request, res: Response) {
        console.log("Post post:")
        req.body.sender = req.body.user._id;
        super.post(req, res);
    }
    async put(req: Request, res: Response) {
        console.log("update post:")
        const filter = { _id: req.params.id };
        const update = {
            message: req.body.message,
            type: req.body.type
        }
        super.put(req, res,filter, update);
    }
    async putSender(req: Request, res: Response) {
        console.log("update post:")
        const filter = { _id: req.params.id };
        let update
       
        super.put(req, res, filter, update);
    }
    async remove(req: Request, res: Response) {
        super.remove(req, res);
    }
}
export default new PostController();