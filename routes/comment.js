const { Router, response } = require("express");
const pool = require("../db/index");
const router = Router();

router.post("/", (request, response, next) => {
  const { issue_id, c_sender_id, c_description } = request.body;
  const sender_id = parseInt(c_sender_id);
  pool.query(
    "INSERT INTO comments (issue_id,c_sender_id,c_description) VALUES($1,$2,$3) ",
    [issue_id, sender_id, c_description],
    (err, res) => {
      if (err) return next(err);
      console.log("comment has been saved");
      response.json({ sended: true });
    }
  );
});

// router.delete("/:id", (request, response, next) => {
//   const { id } = request.params;
//   console.log(id);
//   pool.query("DELETE FROM comments WHERE cid=$1", [id], (err, res) => {
//     if (err) return next(err);
//     response.json(res.rows);
//   });
// });

module.exports = router;
