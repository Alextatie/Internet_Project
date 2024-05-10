import mongoose from 'mongoose';
//import {  Iuser } from "../models/user_model";
export interface Ipost {
    message: string,
    sender: string,
}
const postSchema = new mongoose.Schema<Ipost>({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
});

export default mongoose.model<Ipost>("Post", postSchema);