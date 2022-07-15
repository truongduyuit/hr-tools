import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET || "";
const accessTokenExpireConfig = process.env.ACCESS_TOKEN_EXPIRE || "";
const refreshTokenExpireConfig = process.env.REFRESH_TOKEN_EXPIRE || "";

const generateAccessToken = (data: any) => {
  return jwt.sign(data, secretKey, {
    algorithm: "RS256",
    expiresIn: accessTokenExpireConfig,
  });
};

const generateRefreshToken = (data: any) => {
  return jwt.sign(data, secretKey, {
    algorithm: "RS256",
    expiresIn: refreshTokenExpireConfig,
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};

export { generateAccessToken, generateRefreshToken, verifyToken };
