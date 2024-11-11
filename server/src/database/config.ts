import { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = process.env.DB_URL || "";

export const connectDataBase = async () => {
  try {
    await connect(URL);
    console.log("holbogdoo shaas");
  } catch (err) {
    console.log("Database holboltodd aldaa garlaa");
  }
};
