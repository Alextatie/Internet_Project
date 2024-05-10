import mongoose from 'mongoose';

export interface Istudent {
    name: string,
    _id: string,
    age: number
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
    age: {
        type: Number,
        required: true
    }
});

export default mongoose.model<Istudent>("Student", studentSchema);