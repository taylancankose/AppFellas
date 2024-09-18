import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authCheck = async (req, res, next) => {
  try {
    // Destructure authorization from headers
    const { authorization } = req.headers;

    // Extract the token from the "Bearer <token>" format
    const token = authorization?.split("Bearer ")[1];

    // Check if token exists
    if (!token) {
      return res
        .status(403)
        .json({ error: "Unauthorized request, no token provided" });
    }

    // Verify the token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = verifyToken.userId;

    // Find the user with the provided id and token
    const user = await User.findOne({ _id: id });

    // Check if user exists
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Attach user info to the request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      flights: user.flights,
    };
    req.token = token;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res
      .status(403)
      .json({ message: "Invalid token or request", error: error.message });
  }
};
