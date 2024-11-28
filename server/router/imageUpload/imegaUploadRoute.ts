import { Router } from "express";
import { getPresignedUrl } from "../../controllers/cloudflare/cloudFlare";

const imegaUpload = Router();

imegaUpload.get("/image/:count", async (req, res) => {
  const { count } = req.params;
  const result = await getPresignedUrl(count);
  res.send(result);
});

export default imegaUpload;
