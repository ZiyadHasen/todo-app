import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// 1. Make comparePassword more robust
export const comparePassword = async (
  plainText: string,
  hash: string
): Promise<boolean> => {
  try {
    // console.log("plain pass : " + plainText);
    // console.log("hashed pass : " + hash);
    return await bcrypt.compare(plainText, hash);
  } catch (error) {
    console.error("Password comparison failed:", error);
    return false;
  }
};
