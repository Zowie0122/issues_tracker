const { Router } = require("express");
const pool = require("../db/index");
const router = Router();
const { sign } = require("jsonwebtoken");
const { hash } = require("bcrypt");
require("dotenv").config();

// for admin to register a new employee
router.post("/onboard", (request, response, next) => {
  const { username, email, password, department_id } = request.body;

  const insertValue = (result) => {
    if (result.length === 0) {
      console.log(password);
      pool.query(
        "INSERT INTO users (username, email, password, department_id) VALUES ($1,$2,$3,$4)",
        [username, email, password, department_id],
        (err, res) => {
          if (err) return next({ message: "Server error when inserting data" });
          response.status(200).json({ onboarded: true });
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

// ? change employee's user name

// get all departments info
router.get("/department", (request, response, next) => {
  pool.query("SELECT * FROM departments", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

// add new department
router.post("/department", (request, response, next) => {
  const new_department = request.body;
  pool.query(
    "INSERT INTO departments VALUES($1)",
    [new_department],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// get all departments' employees info
router.get("/department/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
  pool.query(
    "SELECT uid,username FROM users WHERE department_id = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// delete an employee account
router.delete("/employee", (request, response, next) => {
  const { id } = request.body;
  console.log(id);
  pool.query("DELETE FROM users WHERE uid=$1", [id], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

module.exports = router;
