import User from "../models/user";
import { User as UserType } from "../types/user";

export const getUsers = () => User.find();

export const getUserByID = (id: string) => User.findById(id);

export const getUserByEmail = (email: string) => User.findOne({ email: email });

export const createUser = (user: UserType) => User.create(user);
