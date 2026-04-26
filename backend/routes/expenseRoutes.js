import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
  downloadExpenseExcel,
  getExpenseOverview
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

// Add expense
expenseRouter.post("/add", authMiddleware, addExpense);

// Get all expenses
expenseRouter.get("/", authMiddleware, getAllExpense);

// Update expense
expenseRouter.put("/update/:id", authMiddleware, updateExpense);

// Delete expense
expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);

// Download Excel
expenseRouter.get("/download", authMiddleware, downloadExpenseExcel);

// Overview
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

export default expenseRouter;