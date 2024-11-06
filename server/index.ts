import express from "express";
import cors from "cors";
import userRouter from "./router/users/userRouter";
import { connectDataBase } from "./src/database/config";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
connectDataBase();

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`nee deer asna --> http://localhost:${port}`);
});
