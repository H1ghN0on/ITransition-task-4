import jwt from "jsonwebtoken";
import { UserData } from "../controllers/AuthController";

// eslint-disable-next-line import/no-anonymous-default-export
export default (user: UserData): string => {
  const token = jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET_KEY || "",
    {
      expiresIn: process.env.JWT_MAX_AGE!,
      algorithm: "HS256",
    }
  );

  return token;
};
