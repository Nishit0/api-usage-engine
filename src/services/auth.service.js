import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../models/User.model.js";
import { createHttpError } from "../utils/http.js";

const signToken = (user) => {
  return jwt.sign({ id: user._id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email
});

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw createHttpError("Name, email, and password are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError("Email is already registered", 409);
  }

  const user = await User.create({ name, email, password });

  return {
    token: signToken(user),
    user: sanitizeUser(user)
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw createHttpError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw createHttpError("Invalid email or password", 401);
  }

  return {
    token: signToken(user),
    user: sanitizeUser(user)
  };
};
