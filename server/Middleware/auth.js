const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const { id } = req.headers;
    const token = req.headers.authorization;
    const decodedToken = verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId.toString();
    if (id && id !== userId) {
      throw "Authentication failed";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
