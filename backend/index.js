import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */

// CORS: allow both local & production frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "ai-virtual-assistant-iv65kzotj-ansh-777s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Body & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});
/* -------------------- SERVER -------------------- */

// Connect DB first, then start server
connectDb();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
