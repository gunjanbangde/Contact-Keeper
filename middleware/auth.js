const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ message: "No Token, Authorization Denied." });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token is not valid, Authorization Denied." });
  }
};
