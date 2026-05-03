import crypto from "crypto";

export const generateKey = () => {
  return crypto.randomBytes(24).toString("hex");
};