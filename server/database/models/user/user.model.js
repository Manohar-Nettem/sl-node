const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },

  token: {
    type: String,
    require: false,
  },
});

UserSchema.methods.generateToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.secretKey,
    { expiresIn: process.env.expiresIn }
  );
  return token;
};

UserSchema.statics.findByCridentials = async function (email, password) {
  let User = this;
  let userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new Error("EMAIL_NOT_FOUND");
  }
  let isMatched = await bcrypt.compare(password, userInfo.password);
  if (!isMatched) {
    throw new Error("INVALID_PASSWORD");
  }

  return userInfo;
};

UserSchema.pre("save", async function (next) {
  console.log("before saving user");
  const user = this;
  if (this.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.roundTrips)
    );
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
