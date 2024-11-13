import express from "express";
import cors from "cors";
import userRouter from "./router/users/userRouter";
import petRouter from "./router/petAdopt/petRouter";
import appRouter from "./router/application/appRouter";
import { connectDataBase } from "./src/database/config";
import categoryRouter from "./router/category/categoryRouter";
import imageUpload from "./router/imageUpload/imegaUploadRoute";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
connectDataBase();

app.use("/", userRouter, petRouter, appRouter, categoryRouter, imageUpload);

app.listen(port, () => {
  console.log(`nee deer asna --> http://localhost:${port}`);
});
