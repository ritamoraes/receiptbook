const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const router = express.Router();

const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Users works" }));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm", //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch(console.log(error));
        });
      });
    }
  });
});

router.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return response.status(404).json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const jwtPayload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };
        jwt.sign(
          jwtPayload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (error, token) => {
            response.json({
              succes: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return response.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});
module.exports = router;
