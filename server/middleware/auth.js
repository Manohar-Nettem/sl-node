const jwt = require("jsonwebtoken");
const User = require("./../database/models/user/user.model");
module.exports = function (req, res, next) {
  console.log(":::middleware:::");
  try {
    const token = req.header("Authorization").toString().replace("Bearer ", "");
    if (token) {
      const decoded = jwt.verify(token, process.env.secretKey);
      const user = User.findOne({ _id: decoded._id });
      console.log(decoded);
      req.user = user;
    }
    console.log("middleware::");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
