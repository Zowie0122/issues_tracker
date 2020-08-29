const { Router } = require("express");
const pool = require("../db/index");
const router = Router();

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

// show the assignments that the user received
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

// user register
router.post("/", (request, response, next) => {
  const { username, email, password, department_id } = request.body;
  console.log(request.body);
  pool.query(
    "INSERT INTO users (username,email,password,department_id) VALUES ($1,$2,$3,$4)",
    [username, email, password, department_id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

module.exports = router;
