import mongoose, { Schema } from "mongoose";
const usersSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String },
        username: { type: String },
        password: { type: String },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;