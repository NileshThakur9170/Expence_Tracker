// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoute.js";
// import incomeRouter from "./routes/incomeRoute.js";
// import incomeRouter from "./routes/incomeRoute.js";

// dotenv.config();

// const app = express();
// const port = 4000;

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ================= DATABASE =================
// connectDB();

// // ================= ROUTES =================
// app.use("/api/user", userRouter);
// app.use("/api/income", incomeRouter);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // ================= SERVER =================
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js"; // ✅ ADD THIS

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
app.use("/api/income", incomeRouter); // ✅ NOW WORKS

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});