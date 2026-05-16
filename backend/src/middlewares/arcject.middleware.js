import arcjet from "../lib/arcject.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await arcjet.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded." });
      } else if (decision.reason.isBot()) {
        return res.status(430).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }

    next();
  } catch (error) {
    console.error("Arcjecr protection error: ", error);
    next();
  }
};
