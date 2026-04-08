import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  addIncome,
  getAllIncome,
  updateIncome,
  deleteIncome,
  downloadIncomeExcel,
  getIncomeOverview
} from "../controllers/incomeController.js";

const incomeRouter = express.Router();

// Add income
incomeRouter.post("/add", authMiddleware, addIncome);

// Get all income
incomeRouter.get("/", authMiddleware, getAllIncome);

// Update income
incomeRouter.put("/update/:id", authMiddleware, updateIncome);

// Delete income
incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);

// Download Excel
incomeRouter.get("/download", authMiddleware, downloadIncomeExcel);

// Overview
incomeRouter.get("/overview", authMiddleware, getIncomeOverview);

export default incomeRouter;