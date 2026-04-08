// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import {
//   addIncome,
//   getAllIncome,
//   updateIncome,
//   deleteIncome,
//   downloadIncomeExcel,
//   getIncomeOverview
// } from "../controllers/incomeController.js";
// console.log("Auth middleware loaded:", authMiddleware);

// const incomeRouter = express.Router();

// incomeRouter.post("/add", authMiddleware, addIncome);
// incomeRouter.get("/get", authMiddleware, getAllIncome);
// incomeRouter.put("/update/:id", authMiddleware, updateIncome);
// incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
// incomeRouter.get("/export", authMiddleware, exportIncome);
// incomeRouter.get("/downloadexcel", authMiddleware, downloadIncomeExcel);
// incomeRouter.get("/overview", authMiddleware, getIncomeOverview);

// export default incomeRouter; 
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