import Item from "../models/item_model";
import { Iitem } from "../models/item_model";
import BaseController from "./baseController";
import { Request, Response } from "express";
class ItemController extends BaseController<Iitem>{
    constructor() {
        super(Item);
    }
    async get(req: Request, res: Response) {
        console.log("Get items:")
        super.get(req, res);
    }
    async getbyID(req: Request, res: Response) {
        console.log("Get items by ID:")
        super.getbyID(req, res);
    }
    async post(req: Request, res: Response) {
        console.log("Post item:")
        super.post(req, res);
    }
    async put(req: Request, res: Response) {
        console.log("update item:")
        console.log("update post:")
        const filter = { _id: req.params.id };
        const update = {
            name: req.body.message,
        }
        super.put(req, res, filter, update);
    }
    async remove(req: Request, res: Response) {
        console.log("Delete item:")
        super.remove(req, res);
    }
}
export default new ItemController();