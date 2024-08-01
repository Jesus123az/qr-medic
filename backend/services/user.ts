import User from "../models/user";

export const getUsers = () => User.find();
export const getUserByID=(id: string)=> User.findById(id)
export const getUserByEmail= (email: string) => User.findOne({email: email})