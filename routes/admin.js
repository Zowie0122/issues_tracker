const { Router } = require("express");
const pool = require("../db/index");
const router = Router();
const { sign } = require("jsonwebtoken");
const { hash } = require("bcrypt");
require("dotenv").config();

// for admin to register a new employee
router.post("/register", (request, response, next) => {
  const { username, email, password, department_id } = request.body;

  const createToken = (result) => {
    pool.query(
      "SELECT uid FROM users WHERE email = $1",
      [email],
      (err, res) => {
        if (err) return next(err);
        const claims = { sub: res.rows[0].uid };
        const jwt = sign(claims, process.env.TOKEN_SECRET, {
          expiresIn: "1h",
        });

        response.status(200).json({ authToken: jwt, userId: res.rows[0].uid });
      }
    );
  };

  const insertValue = (result) => {
    if (result.length === 0) {
      console.log(password);
      pool.query(
        "INSERT INTO users (username, email, password, department_id) VALUES ($1,$2,$3,$4)",
        [username, email, password, department_id],
        (err, res) => {
          if (err) return next({ message: "Server error when inserting data" });
          createToken(res.rows);
        }
      );
    }
  };

  pool.query(
    "SELECT uid FROM users WHERE email=$1 GROUP BY uid HAVING COUNT(*) = 1",
    [email],
    (err, res) => {
      if (err)
        return next({ message: "This email has already been registered" });
      insertValue(res.rows);
    }
  );
});

// add new department

// delete an employee account

// ? change employee's user name

module.exports = router;
