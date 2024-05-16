import mongoose from 'mongoose';

export interface Iuser {
    _id: string,
    name: string,
    email: string,
    password: string,
    avatar_url: string,
    tokens: string[]
}
const userSchema = new mongoose.Schema<Iuser>({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String
    },
    tokens: {
        type: [String]
    }
});

export default mongoose.model<Iuser>("User", userSchema);