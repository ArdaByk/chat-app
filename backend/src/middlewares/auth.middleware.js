import jwt from "jsonwebtoken";
import User from "../modals/User";
import "dotenv/config";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) res.status(401).json({ message: "Unauthorized." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Unauthorized." });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found." });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute middleware: ", error);
  }
};
