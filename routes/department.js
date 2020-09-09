const { Router } = require("express");
const pool = require("../db/index");
const router = Router();

require("dotenv").config();

// get all departments info
router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM departments", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

// get a department' employees info
router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT uid,username FROM users WHERE department_id = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

module.exports = router;
