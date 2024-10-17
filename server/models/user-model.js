const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user > this.isModified("password")) {
    next();
  }
  try {
    const saltround = 10;
    const hash_password = await bcrypt.hash(user.password, saltround);
    user.password = hash_password;
  } catch (e) {
    throw e;
  }
});

userSchema.methods.compatepassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
//json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.VITE_JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (e) {
    throw e;
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
