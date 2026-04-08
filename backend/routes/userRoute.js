import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// User routes
userRouter.get("/me", auth, getCurrentUser);
userRouter.put("/profile", auth, updateProfile);
userRouter.put("/password", auth, updatePassword);

export default userRouter;