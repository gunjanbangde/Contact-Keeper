const express = require("express");
const router = express.Router();

//@Route    POST api/users
//@Desc     Register a new user
//@Access   Public
router.post("/", (req, res) => {
  res.send("Register a User.");
});

module.exports = router;