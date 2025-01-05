import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token; // Include token for downstream use
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};