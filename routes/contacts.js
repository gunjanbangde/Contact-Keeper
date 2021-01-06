const express = require("express");
const router = express.Router();

//@Route    GET api/contacts
//@Desc     Get all contact
//@Access   Private
router.get("/", (req, res) => {
  res.send("Get contacts of the logged in user");
});

//@Route    POST api/contacts
//@Desc     Create a new contact
//@Access   Private
router.post("/", (req, res) => {
  res.send("Create a new contact");
});

//@Route    PUT api/contacts/:id
//@Desc     Update a specific contact
//@Access   Private
router.put("/:id", (req, res) => {
  res.send("Update a contact");
});

//@Route    DELETE api/contacts/:id
//@Desc     Delete a existing contact
//@Access   Private
router.delete("/:id", (req, res) => {
  res.send("Delte a conntact.");
});

module.exports = router;
