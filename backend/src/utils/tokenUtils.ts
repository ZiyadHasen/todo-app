import jwt from "jsonwebtoken";

export const createJWT = (payload: object): string => {
  // Validate required environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};

// export const verifyJWT = (token: string) => {
//   const decoded = jwt.verify(token, secret) as {
//     userId: string,
//     role: string,
//     name: string
//     role:string
//   };
//   return { user: decoded };  // ← Return pre-formed user object
// };
