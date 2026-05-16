import express from "express";
import dotenv from "dotenv";
import path from "path";
import { cookieParser } from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on 3000");
  connectDB();
});
