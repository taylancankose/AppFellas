import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  // check if user exists with the same email
  const checkUser = await User.findOne({ email });

  if (checkUser) return res.status(403).json({ error: "Email already in use" });

  const user = await User.create({ email, password, name });

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      reservations: user.reservations,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(403).json({ error: "Email or password not found" });

  // check passwords are matching
  const isPWMatched = await user.comparePassword(password);
  if (!isPWMatched)
    return res.status(403).json({ error: "Password is incorrect" });

  // create token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // define user to token
  user.token = token;

  // token is added so save it again
  await user.save();

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      reservations: user.reservations,
    },
    token: token,
  });
};

export const logout = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new Error("Something went wrong, user not found");

  user.token = null;
  await user.save();

  res.json({ message: "Logged out" });
};
