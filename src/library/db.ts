import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        return true;
    } catch (error) {
        console.log('Db failed to connect:-' + error);
        return false;
    }
}
export default connectDB;