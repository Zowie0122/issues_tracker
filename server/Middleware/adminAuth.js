const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const { id } = req.headers;
    const token = req.headers.authorization;
    const decodedToken = verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId.toString();
    console.log(id);
    if (id && id !== userId && id !== "1") {
      throw "Admin Authentication Failed";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid Request!"),
    });
  }
};
