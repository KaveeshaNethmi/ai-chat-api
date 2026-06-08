import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const generateTokens = (userId) => {
  const jwtToken = jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  return jwtToken;
};
