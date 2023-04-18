const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt exists and is valid
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Invalid or expired token" });
      } else {
        const user = await User.findById(decodedToken.userId);
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ errorMessage: "Authentication required" });
  }
};

module.exports = { requireAuth };
