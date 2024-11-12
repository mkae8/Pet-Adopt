import { Router } from "express";
import { getPresignedUrl } from "../../controllers/testt/test";

const imgUpload = Router();

imgUpload.route("/upload").post(getPresignedUrl);

export default imgUpload;
