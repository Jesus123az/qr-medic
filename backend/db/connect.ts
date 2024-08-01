import mongoose from "mongoose";

const DB = process.env.MONGODB_URI ?? "";

let db: typeof mongoose;

export const connectDB = async () => {
  return new Promise<typeof mongoose>(async (resolve, reject) => {
    try {
      if (db) {
        resolve(db);
        return;
      }
      db = await mongoose.connect(DB);
      resolve(db);
    } catch (error) {
      reject(error);
    }
  });
};
