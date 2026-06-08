import { loginUserService, registerUserService } from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userData = await registerUserService(name, email, password);

    return res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
