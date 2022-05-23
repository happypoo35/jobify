import ApiError from "../errors/custom.error.js";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ user });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  user.createAndSendJWT(user, req, res, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError("Invalid username or password", 401);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError("Invalid username or password", 401);
  }

  user.createAndSendJWT(user, req, res, 200);
};

export const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      lastName,
      email,
      location,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ user });
};

export const logout = (req, res) => {
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";

  res.cookie("token", "", {
    maxAge: 0,
    secure,
    httpOnly: true,
  });

  res.status(204).json({ msg: "Logged out" });
};
