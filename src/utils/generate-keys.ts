import crypto from "crypto";

export const generateRandomBase64String = (length: number) => {
  const randomBytes = crypto.randomBytes(Math.ceil((length * 3) / 4));
  return randomBytes.toString("base64").slice(0, length);
};
