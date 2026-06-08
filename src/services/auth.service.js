import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateTokens } from "../utils/generateTokens.js";

export const registerUserService = async (name, email, password) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateTokens(user._id);

  return {
    user,
    token,
  };
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentilas!");
  }

  const token = generateTokens(user._id.toString());

  return {
    user, // Return only the necessary data of the User, This is just for my easiness
    token,
  };
};
