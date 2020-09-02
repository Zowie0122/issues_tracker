const { Router } = require("express");
const pool = require("../db/index");
const router = Router();
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { hash } = require("bcrypt");
require("dotenv").config();

// user's dashboard interface
// show the profile info
router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
  pool.query(
    "SELECT * FROM users LEFT JOIN departments ON users.department_id = departments.did WHERE uid = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// for employee logins in
router.get("/", (request, response, next) => {
  const email = request.query.email;
  // const password = request.query.password;
  console.log(request.query);
  pool.query(
    "SELECT * FROM users LEFT JOIN departments ON users.department_id = departments.did WHERE email = $1",
    [email],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// show the issues that the user posted which still ongoing
router.get("/:id/issues/ongoing", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
  pool.query(
    "SELECT * FROM issues WHERE sender_id = $1 AND i_status = $2",
    [id, "Ongoing"],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// show the issues that the user posted which already solved
router.get("/:id/issues/solved", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
  pool.query(
    "SELECT * FROM issues WHERE sender_id = $1 AND i_status = $2",
    [id, "Solved"],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// show the assignments that the user received which is ongoing
router.get("/:id/assignments/ongoing", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM issues WHERE receiver_id = $1 AND i_status = $2",
    [id, "Ongoing"],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// show the assignments that the user solved
router.get("/:id/assignments/solved", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM issues WHERE receiver_id = $1 AND i_status = $2",
    [id, "Solved"],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// for employee login
router.post("/", (request, response, next) => {
  const { email, password } = request.body;
  console.log(request.body);

  pool.query(
    "SELECT uid, password FROM users WHERE email=$1",
    [email],
    (err, res) => {
      if (err) return next({ message: "Invalid User Account" });
      console.log(password, res.rows[0].password);
      compare(password, res.rows[0].password, function (err) {
        if (!err) {
          const claims = { sub: res.rows[0].uid };
          const jwt = sign(claims, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
          });
          response
            .status(200)
            .json({ authToken: jwt, userId: res.rows[0].uid });
        } else {
          response
            .status(400)
            .json({ message: "Email and Password are not matched" });
        }
      });
    }
  );
});

module.exports = router;
