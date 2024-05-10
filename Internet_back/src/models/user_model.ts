import mongoose from 'mongoose';

export interface Iuser {
    email: string,
    password: string,
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
    tokens: {
        type: [String]
    }
});

export default mongoose.model<Iuser>("User", userSchema);