import { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = process.env.DB_URL || "";

export const connectDataBase = async () => {
  try {
    await connect(URL);
    console.log("Successfully connected to the database.");
  } catch (err) {
    console.log("Database holboltodd aldaa garlaa");
  }
};
