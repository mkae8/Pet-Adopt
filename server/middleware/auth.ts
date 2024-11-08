import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return req.status(404).send({ message: "Token provided" });
  }

  const jwtToken = token.split(" ")[1];

  if (!jwtToken) {
    return req.status(401).send({ message: "Token yostoo bhq bn shuu " });
  }
  jwt.verify(jwtToken, process.env.SECRET as string, (err: any, succ: any) => {
    if (err) {
      return res.status(401).send({ message: err.message });
    } else {
      res.locals.userId = succ.id;
      next();
    }
  });
};
