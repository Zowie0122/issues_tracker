const { Router } = require("express");
const pool = require("../db/index");
const router = Router();
require("dotenv").config();

// for admin to register a new employee
router.post("/onboard", (request, response, next) => {
  const { username, email, password, department_id } = request.body;

  const insertValue = (result) => {
    if (result.length === 0) {
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

// add new department
router.post("/department", (request, response, next) => {
  const { new_department } = request.body;
  pool.query(
    "INSERT INTO departments (department_name) VALUES($1)",
    [new_department],
    (err, res) => {
      if (err) return next(err);
      response.json({ added_department: true });
    }
  );
});

// delete an employee account
router.delete("/delete/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("DELETE FROM users WHERE uid=$1", [id], (err, res) => {
    if (err) return next(err);
    response.json({ user_deleted: true });
  });
});

// ? change employee's user name

module.exports = router;
