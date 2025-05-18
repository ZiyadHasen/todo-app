import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/passwordUtils";
import { Role } from "../constants/constants";

interface UserType {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthYear: number;
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.user!.userId }).select(
      "-password"
    );
    // console.log("the logged in user : " + user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, birthYear, password } = req.body;
  console.log(
    `Received update data - Name: ${name}, Email: ${email}, Phone: ${phone}, Birth Year: ${birthYear}, Password: ${
      password ? "Provided" : "Not Provided"
    }`
  );

  // Build your $set payload
  const updateData: Partial<UserType> = {
    name,
    email,
    phone,
    birthYear,
  };

  // Only hash & set password if it was provided
  if (password) {
    updateData.password = await hashPassword(password);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user!.userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password"); // drop password from response

  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
};
