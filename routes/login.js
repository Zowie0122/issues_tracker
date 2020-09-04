const { Router } = require("express");
const pool = require("../db/index");
const router = Router();
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

require("dotenv").config();

// for employee login
router.post("/employee", (request, response, next) => {
  const { email, password } = request.body;

  pool.query(
    "SELECT uid, password FROM users WHERE email=$1",
    [email],
    (err, res) => {
      if (err || res.rows.length === 0)
        return next({ message: "Invalid User Account" });

      compare(password, res.rows[0].password, function (err) {
        if (!err) {
          const claims = { userId: res.rows[0].uid };
          const token = sign(claims, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
          });
          response.status(200).json({ auth: token, id: res.rows[0].uid });
        } else {
          response.status(400).json({ message: "Wrong Password" });
        }
      });
    }
  );
});

// for admin login
router.post("/admin", (request, response, next) => {
  const { email, password } = request.body;
  if (email !== "admin@zowie.com") {
    response.status(200).json({ message: "Not Admin" });
  } else {
    pool.query(
      "SELECT uid, password FROM users WHERE email=$1",
      [email],
      (err, res) => {
        if (err) return next({ message: "Server Error" });
        compare(password, res.rows[0].password, function (err) {
          if (!err) {
            const claims = { userId: res.rows[0].uid };
            const token = sign(claims, process.env.TOKEN_SECRET, {
              expiresIn: "1h",
            });
            response.status(200).json({ auth: token });
          } else {
            response.status(400).json({ message: "Wrong Password" });
          }
        });
      }
    );
  }
});

module.exports = router;
