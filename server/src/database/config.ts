import { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = process.env.DB_URL || "";

export const connectDataBase = async () => {
  console.log(URL, "URLURLURLURL");
  console.log(process.env, "asdkajsjdaksldmalksjhdklasjdlajsdlkasj");

  try {
    await connect(URL);
    console.log("holbogdoo shaas");
  } catch (err) {
    console.log(err, "ggg");

    console.log("Database holboltodd aldaa garlaa");
  }
};
