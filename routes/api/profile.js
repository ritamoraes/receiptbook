const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const errors = {};

    Profile.findOne({ user: request.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user.";
          return response.status(404).json(errors);
        }
        response.json(profile);
      })
      .catch((error) => response.status(404).json(error));
  }
);

module.exports = router;
