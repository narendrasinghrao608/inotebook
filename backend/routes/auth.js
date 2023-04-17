const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "harekrishnakrishna";
//Route 1:Create a User using:POST "/api/auth/creatuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "password must  at least 5 character ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the  error
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData)
      success=true
      res.json({success, authtoken });
      //catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal error occured");
    }
  }
);
//Route 2:login user using:POST "/api/auth/login." No login required
router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "password cannot be blank ").exists(),
  ],
  async (req, res) => {
    let success=false;
    // if there are errors, return bad request and the  error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server Error");
    }
  }
);
// Route 3:get logged user details:POST "/api/auth/getiser."  login required
router.post(
  "/getuser",fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server Error");
    }
  }
);
module.exports = router;
