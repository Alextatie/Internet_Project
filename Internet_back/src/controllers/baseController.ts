//import Student from "../models/student_model";
import {Request, Response } from "express";
import mongoose from "mongoose";

class BaseController<ModelType>{

    itemModel: mongoose.Model<ModelType>;
    constructor(itemModel: mongoose.Model<ModelType>){
        this.itemModel = itemModel;
    }

    async get (req: Request, res: Response){
        try {
            let item;
            if (req.query._id) {
                item = await this.itemModel.find({ _id: req.query._id });
            }
            else if (req.query.name) {
                item = await this.itemModel.find({ name: req.query.name });
            }
            else if (req.query.email) {
                item = await this.itemModel.find({ email: req.query.email });
            }
            else if (req.query.sender) {
                item = await this.itemModel.find({ sender: req.query.sender });
            }
            else {
                item = await this.itemModel.find();
            }
            res.status(200).send(item);
            console.log(item);
            
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    async getbyID(req: Request, res: Response){
        try {
            const item = await this.itemModel.findById(req.params.id);
            if (!item) {
                res.status(404).send("Item not found");
                console.log("Item not found");
            }
            else {
                res.status(200).send(item);
                console.log(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    
    async post(req: Request, res: Response){
        try {
            const item = await this.itemModel.create(req.body);
            console.log(item);
            res.status(201).send(item);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
    
    async put(req: Request, res: Response, filter, update){
        try {
            const item = await this.itemModel.findOneAndUpdate(filter, update);
            console.log(filter, update);
            res.status(200).send(item);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    
    async remove(req: Request, res: Response){
        try {
            const item = await this.itemModel.findByIdAndDelete(req.params.id);
            res.status(200).send(item);
            console.log(item)
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

export default BaseController;