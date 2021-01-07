const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const auth = require("../middleware/auth");

//@Route    GET api/auth
//@Desc     Get the logged in user
//@Access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@Route    POST api/auth
//@Desc     Auth user and get token
//@Access   Public
router.post(
  "/",
  [
    check("email", "Please enter a valid Email.").isEmail(),
    check("password", "Enter a password with 6 or more characters.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials." });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error.");
    }
  }
);

module.exports = router;
