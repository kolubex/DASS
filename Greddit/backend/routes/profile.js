const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const jwt = require("jsonwebtoken");

router.get("/:id", async (req, res) => {
  try {
    const usersignedup = await user
      .findById(req.params.id)
      .populate(["Following", "Followers"]);
    // console.log(req.body.id)
    res.json(usersignedup);
  } catch (err) {
    console.log(err);
  }
});

router.post("/unfollow/:id", async (req, res, config) => {
  try {
    const decodedtoken = jwt.verify(gettoken(config), process.env.SECRET);
    if (!decodedtoken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const chagestuff = await user.findById(decodedtoken.id);
    chagestuff.Following.pop(req.body.id);
    const following = await user.findById(req.body.id);
    following.Followers.pop(decodedtoken.id);
    following.save();
    chagestuff.save();
    res.json(chagestuff);
  } catch (err) {
    console.log(err.message);
  }
});

// remove a follower by id
router.post("/remove/:id", async (req, res) => {
  try {
    const decodedtoken = jwt.verify(gettoken(req.params.id), process.env.SECRET);
    if (!decodedtoken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const chagestuff = await user.findById(decodedtoken.id);
    chagestuff.Followers.pop(req.body.id);
    const follower = await user.findById(req.body.id);
    follower.Following.pop(decodedtoken.id);
    follower.save();
    chagestuff.save();
    res.json(chagestuff);
  } catch (err) {
    console.log(err.message);
  }
});

// add followeing by id
router.post("/addfollower/:id", async (req, res) => {
  try {
    const decodedtoken = jwt.verify(gettoken(req.params.id), process.env.SECRET);
    if (!decodedtoken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const chagestuff = await user.findById(decodedtoken.id);
    chagestuff.Following.push(req.body.id);
    const followedguy = await user.findById(req.body.id);
    followedguy.Followers.push(decodedtoken.id);
    chagestuff.save();
    res.json(chagestuff);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;