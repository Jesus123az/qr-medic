import { User as UserType } from "../types/user";
import mongoose from "mongoose";
import HealthInfo from "./healthInfo";

const {Schema } = mongoose

let User: mongoose.Model<UserType>;

if (mongoose.models.User) {
  User = mongoose.model<UserType>("User");
} else {
  const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        healthInfo: {type: Schema.ObjectId, ref: "healthInfo" , default: null, required: false},
        qrCodeGenerated: {type: Boolean, default: false, required: false},
    },
    { timestamps: true }
  );

  User = mongoose.model<UserType>("User", UserSchema);
}

export default User;
