const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // check if token exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // if there is a token then continue to verify it
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
