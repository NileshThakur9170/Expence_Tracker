import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js"; 
import expenseRouter from "./routes/expenseRoutes.js";
import dashboardRouter from "./routes/dashboardRoute.js";

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter); 
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});