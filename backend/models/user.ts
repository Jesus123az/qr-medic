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
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profileImage: {type: String, required: true},
        healthInfo: {type: Schema.ObjectId, ref: "healthInfo" , default: null, required: false},
    },
    { timestamps: true }
  );

  User = mongoose.model<UserType>("User", UserSchema);
}

export default User;
