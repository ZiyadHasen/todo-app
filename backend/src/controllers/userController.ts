import { NextFunction, Request, Response } from "express";
import User from "../models/User";

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
  // *we just can do this the later is more secure
  // const { name, email, phone, birthYear } = req.body;
  const allowed = ["name", "email", "phone", "birthYear"];
  const updateData: Record<string, any> = {};
  allowed.forEach((key) => {
    if (req.body[key]) updateData[key] = req.body[key];
  });
  const { name, email, phone, birthYear } = updateData;

  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user?.userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
};
