const User = require("../models/user");

//importing token

const createToken = require("../utils/token");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.register(name, email, password);

    const token = createToken(user._id);

    res.status(201).json({
      message: "Created with user details",
      name: user.name,
      email: user.email,
      // password,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({
      message: "OK with JWT Token",
      email: user.email,
      // password,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
