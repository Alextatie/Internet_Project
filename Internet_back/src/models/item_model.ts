import mongoose from 'mongoose';

export interface Iitem {
    name: string,
}
const itemSchema = new mongoose.Schema<Iitem>({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<Iitem>("Item", itemSchema);