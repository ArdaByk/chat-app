import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import {server, app} from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server running on 3000");
  connectDB();
});
