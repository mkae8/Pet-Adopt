import { Router } from "express";
import { getPresignedUrl } from "../../controllers/cloudflare/cloudFlare";

const imegaUpload = Router();

imegaUpload.get("/image", async (req, res) => {
  const result = await getPresignedUrl();
  res.send(result);
});
// imegaUpload.put("/image", async (req, res) => {
//   const result = await getPresignedUrl();
//   res.send(result);
// });

export default imegaUpload;
