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
      "https://ai-virtual-assistant-1ysg.onrender.com",
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

/* -------------------- SERVER -------------------- */

// Connect DB first, then start server
connectDb();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
