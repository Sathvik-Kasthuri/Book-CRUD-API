const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//signup

userSchema.statics.register = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  const exists = await User.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({ name, email, password: hash });
  return user;
};

//login

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
