import mongoose from 'mongoose';
//import {  Iuser } from "../models/user_model";
export interface Ipost {
    message: string,
    sender: string,
    senderName: string,
    sender_avatar: string,
    type: string
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
    senderName: {
        type: String,
        required: true
    },
    sender_avatar: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

export default mongoose.model<Ipost>("Post", postSchema);