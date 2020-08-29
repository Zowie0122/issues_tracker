const { Router, response } = require("express");
const pool = require("../db/index");
const router = Router();

router.post("/", (request, response, next) => {
  const { issue_id, c_description } = request.body;
  console.log(request.body);
  pool.query(
    "INSERT INTO comments (issue_id, c_description) VALUES($1,$2) ",
    [issue_id, c_description],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
  pool.query("DELETE FROM comments WHERE cid=$1", [id], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM comments", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

module.exports = router;
