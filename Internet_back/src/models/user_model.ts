import mongoose from 'mongoose';

export interface Iuser {
    email: string,
    password: string,
    picture: string,
    tokens: string[]
}
const userSchema = new mongoose.Schema<Iuser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    tokens: {
        type: [String]
    }
});

export default mongoose.model<Iuser>("User", userSchema);