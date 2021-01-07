const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const auth = require("../middleware/auth");

//@Route    GET api/contacts
//@Desc     Get all contact
//@Access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

//@Route    POST api/contacts
//@Desc     Create a new contact
//@Access   Private
router.post(
  "/",
  [auth, [check("name", "Name is Required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  }
);

//@Route    PUT api/contacts/:id
//@Desc     Update a specific contact
//@Access   Private
router.put("/:id", auth, async (req, res) => {
  res.send("Update a contact");
});

//@Route    DELETE api/contacts/:id
//@Desc     Delete a existing contact
//@Access   Private
router.delete("/:id", (req, res) => {
  res.send("Delte a conntact.");
});

module.exports = router;
