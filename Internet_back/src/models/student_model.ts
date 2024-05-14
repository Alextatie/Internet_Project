import mongoose from 'mongoose';

export interface Istudent {
    name: string,
    _id: string,
    avatar_url: string
}
const studentSchema = new mongoose.Schema<Istudent>({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String
    }
});

export default mongoose.model<Istudent>("Student", studentSchema);