import jwt from "jsonwebtoken";
import User from "../modals/User";
import "dotenv/config";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => {
        row.startsWith("jwt");
      })
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected.");
      return next(new Error("Unauthorized."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected.");
      return next(new Error("Unauthorized."));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected.");
      return next(new Error("User not found."));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`socket authenticated for user: ${user.fullName}`);

    next();
  } catch (error) {}
};
