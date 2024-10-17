const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const home = async (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (e) {
    throw e;
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      message: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (e) {
    throw e;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    console.log(userExist.password);

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.compatepassword(password);

    if (user) {
      res.status(200).json({
        message: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ message: "Invalid credential" });
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { home, register, login };
