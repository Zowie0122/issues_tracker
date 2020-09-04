const { Router, request, response } = require("express");
const pool = require("../db/index");
const router = Router();

// when click on an issue, direct to new page with all comments belongs to this issue
router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM issues LEFT JOIN comments ON issues.iid = comments.issue_id WHERE iid = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// to post an issue
router.post("/", (request, response, next) => {
  const {
    sender_id,
    i_title,
    i_description,
    i_priority,
    // i_deadline,
    i_status,
    receiver_id,
  } = request.body;

  pool.query(
    "INSERT INTO issues (sender_id,i_title,i_description,i_priority,i_status,receiver_id) VALUES($1,$2,$3,$4,$5,$6)",
    [
      sender_id,
      i_title,
      i_description,
      i_priority,
      // i_deadline,
      i_status,
      receiver_id,
    ],
    (err, res) => {
      if (err) return next(err);
      response.json({ sended_out: true });
    }
  );
});

// for the poster of the issue to modify the issue details.

router.put("/:id", (request, response, next) => {
  const { id } = request.params;

  const {
    i_title,
    i_description,
    i_priority,
    i_deadline,
    i_status,
    receiver_id,
  } = request.body;

  const keys = [
    "i_title",
    "i_description",
    "i_priority",
    "i_deadline",
    "i_status",
    "receiver_id",
  ];
  const fields = [];
  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE issues SET ${field} =($1) WHERE iid =($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.json({ edited: true });
      }
    );
  });
});

module.exports = router;
