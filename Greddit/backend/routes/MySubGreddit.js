const express = require("express");
const { Mongoose, Schema, Types, default: mongoose } = require("mongoose");
const router = express.Router();
const SubGreddit = require("../models/SubGreddit.js");
const user = require("../models/user.js");
const Posts = require("../models/Posts.js");
const jwt = require("jsonwebtoken");
const gettoken = require("../middleware/jwt.js");
const Reports = require("../models/Report.js");
router.post("/create/", async (req, res) => {
  try {
    const decodedtoken = jwt.verify(
      gettoken(req.body.token),
      process.env.SECRET
    );
    if (!decodedtoken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const usersignedup = await user.findById(decodedtoken.id);
    console.log(req.body);
    const SubGreddits = new SubGreddit({
      Title: req.body.Title,
      Description: req.body.Description,
      Tags: req.body.Tags.split(" "), //splitting the tags
      BannedWords: req.body.BannedWords.split(" "), //splitting the banned words
      Moderator: req.body.Moderator,
      Members: req.body.Members,
      Posts: req.body.Posts,
    });
    console.log(SubGreddits);
    SubGreddits.save();
    usersignedup.HerSubgreddits.push(SubGreddits._id);
    usersignedup.Joinedsubgreddits.push(SubGreddits._id);
    usersignedup.save();
    console.log(usersignedup);
    res.json(SubGreddits);
  } catch (err) {
    console.log(err);
  }
});

// get requests to a subgreddit with id
router.get("/requests/:id/", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.findById(req.params.id);
    console.log(SubGreddits);
    const users = await user.find({ _id: { $in: SubGreddits.Requests } });
    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
});

// post request to accept or reject a request based on body.status and body.id
router.post("/requeststatus/:id", async (req, res) => {
  try {
    console.log(req.body, req.params.id, "entered requeststatus");
    const user1 = await user.findById(req.body.id);
    const SubGreddits = await SubGreddit.findById(req.params.id);
    console.log(user1, SubGreddits, "entered requeststatus");
    if (req.body.status === "1") {
      SubGreddits.Members.push(mongoose.Types.ObjectId(req.body.id));
      user1.Joinedsubgreddits.push(mongoose.Types.ObjectId(req.params.id));
      SubGreddits.Requests.pop(mongoose.Types.ObjectId(req.body.id));
    } else {
      SubGreddits.Requests.pop(mongoose.Types.ObjectId(req.body.id));
    }
    SubGreddits.save();
    user1.save();
    console.log(user1.UserName);
    res.json(SubGreddits);
  } catch (err) {
    console.log(err.message);
  }
});

// post request to delete a subgreddit
router.post("/delete/:id", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.findById(req.params.id);
    const users = await user.find({ _id: { $in: SubGreddits.Members } });
    users.forEach((user) => {
      user.Joinedsubgreddits.pop(req.params.id);
      user.save();
    });
    const users2 = await user.findById(SubGreddits.Moderator);
    users2.HerSubgreddits.pop(req.params.id);
    users2.save();
    // deleting all the posts of the subgreddit
    const posts = await Posts.find({ _id: { $in: SubGreddits.Posts } });
    posts.forEach((post) => {
      post.delete();
    });
    // delete all the reports of the subgreddit
    const reports = await Reports.find({ _id: { $in: SubGreddits.Reports } });
    reports.forEach((report) => {
      report.delete();
    });
    SubGreddits.delete();
    res.json(SubGreddits);
  } catch (err) {
    console.log(err.message);
  }
});

// get subgreddit of users
router.get("/:id", async (req, res) => {
  try {
    const decodedtoken = jwt.verify(
      gettoken(req.params.id),
      process.env.SECRET
    );
    if (!decodedtoken) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const usersignedup = await user.findById(decodedtoken.id);
    //populate the subgreddits and send it
    const SubGreddits1 = await SubGreddit.find({
      _id: { $in: usersignedup.HerSubgreddits },
    });
    res.json(SubGreddits1);
    console.log(SubGreddits1);
  } catch (err) {
    console.log(err.message);
  }
});

// delete a subgreddit with given id for it, and remove it from all the users subgreddits list, and remove all the posts of users from the users post list, remove it from moderators HerSubgreddits list,
router.delete("/delete/:id", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.findById(req.params.id);
    const users = await user.find({ _id: { $in: SubGreddits.Members } });
    users.forEach((user) => {
      user.HerSubgreddits.pop(req.params.id);
      user.save();
    });
    const users1 = await user.find({ _id: { $in: SubGreddits.Posts } });
    users1.forEach((user) => {
      user.HerPosts.pop(req.params.id);
      user.save();
    });
    const users2 = await user.findById(SubGreddits.Moderator);
    users2.HerSubgreddits.pop(req.params.id);
    users2.save();
    SubGreddits.delete();
    res.json(SubGreddits);
  } catch (err) {
    console.log(err.message);
  }
});

// send details of the subgreddits by populating the members
router.get("/sendusers/:id", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    console.log(SubGreddits);
    const users = await user.find({ _id: { $in: SubGreddits.Members } });
    const response = [];
    // add the username to the response and if the user is moderator send status as moderator, if user is in blocked users send status as blocked, else send status as member and first send moderator, the non-blocked members and then blocked members
    users.forEach((user1) => {
      if (SubGreddits.Moderator.toString() == user1._id.toString()) {
        response.push({ name: user1.UserName, status: "moderator" });
      } else if (SubGreddits.BlockedUsers.includes(user1._id)) {
        response.push({ name: user1.UserName, status: "blocked" });
      } else {
        response.push({ name: user1.UserName, status: "member" });
      }
    });
    // rearrange the response to send moderator first, then non-blocked members and then blocked members
    const response1 = [];
    response.forEach((user1) => {
      if (user1.status == "moderator") {
        response1.push(user1);
      }
    });
    response.forEach((user1) => {
      if (user1.status == "member") {
        response1.push(user1);
      }
    });
    response.forEach((user1) => {
      if (user1.status == "blocked") {
        response1.push(user1);
      }
    });
    res.json(response1);
  } catch (err) {
    console.log(err.message);
  }
  const usersignedin = await user.findById(req.body.Moderator);
});

module.exports = router;
