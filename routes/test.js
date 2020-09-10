const { Router, request, response } = require("express");
const pool = require("../db/index");
const router = Router();

router.get("/allissues", (request, response, next) => {
  pool.query("SELECT * FROM issues", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/allusers", (request, response, next) => {
  pool.query("SELECT * FROM users", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/department", (request, response, next) => {
  pool.query("SELECT * FROM departments", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/department/:id", (request, response, next) => {
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

router.get("/allcomments", (request, response, next) => {
  pool.query("SELECT * FROM comments", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/comment/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM comments LEFT JOIN users ON c_sender_id = users.uid LEFT JOIN issues ON issue_id = issues.iid WHERE cid = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/:id/comments", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM comments LEFT JOIN issues ON issue_id=iid WHERE iid = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

module.exports = router;
