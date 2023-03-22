const express = require("express");
const { Mongoose, Schema, Types } = require("mongoose");
const router = express.Router();
const SubGreddit = require("../models/SubGreddit.js");
const user = require("../models/user.js");
const Posts = require("../models/Posts.js");
const jwt = require("jsonwebtoken");
const gettoken = require("../middleware/jwt.js");

router.post("/", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.find();
    res.json(SubGreddits);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/tags", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.find();
    const tags = [];
    SubGreddits.forEach((subgreddit) => {
      subgreddit.Tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    res.json(tags);
  } catch (err) {
    console.log(err.message);
  }
});

// send list of subgreddits that a user is a member of
router.get("/joinedsubgreddits/:id", async (req, res) => {
  try {
    const usersignedup = await user.findById(req.params.id);
    const SubGreddits = await SubGreddit.find({
      _id: { $in: usersignedup.Joinedsubgreddits },
    }).select("_id");
    res.json(SubGreddits);
  } catch (err) {
    console.log(err.message, "joinedsubgreddits");
  }
});

// send details of the particular subgreddit with id in the url
router.get("/getsubgredditdetails/:id", async (req, res) => {
  try {
    const SubGreddits = await SubGreddit.findById(req.params.id);
    res.json(SubGreddits);
  } catch (err) {
    console.log(err.message);
  }
});

// find the subgreddit by id and send the posts in it
router.get("/posts/:id", async (req, res) => {
  try {
    const subgreddit1 = await SubGreddit.findById(req.params.id);
    const subgredditposts = await Posts.find({
      _id: { $in: subgreddit1.Posts },
    });
    const BlockedUserslen = subgreddit1.BlockedUsers.length;
    temp = subgredditposts.length;
    console.log(temp);
    //add username to the posts sent with the username of PostedBy user
    for (let i = 0; i < temp; i++) {
      const user1 = await user.findById(subgredditposts[i].PostedBy);
      subgredditposts[i] = {
        ...subgredditposts[i]._doc,
        username: user1.UserName,
      };
    }
    // change the username of users of who are in blocked in a subgreddit list to Blocked_User
    for (let i = 0; i < temp; i++) {
      for (let j = 0; j < BlockedUserslen; j++) {
        console.log(subgredditposts[i]);
        const user1 = await user.findById(subgredditposts[i].PostedBy);
        console.log(subgredditposts[i]);
        if (subgredditposts[i].PostedBy == subgreddit1.BlockedUsers[j]) {
          // change username to Blocked_User
          subgredditposts[i] = {
            ...subgredditposts[i]._doc,
            username: "Blocked_User",
          };
        }
      }
    }

    res.json(subgredditposts);
  } catch (err) {
    console.log(err.message);
  }
});

// create a post request to leave a subgreddit by a user in both  user schema and subgreddit schema
router.post("/leave/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const subgreddit1 = await SubGreddit.findById(req.params.id);
    const usersignedup = await user.findById(req.body.id);
    console.log(usersignedup);
    const index = usersignedup.Joinedsubgreddits.indexOf(req.params.id);
    if (index > -1) {
      usersignedup.Joinedsubgreddits.splice(index, 1);
      await usersignedup.save();
    }
    const index1 = subgreddit1.Members.indexOf(req.body.id);
    if (index1 > -1) {
      subgreddit1.Members.splice(index1, 1);
      await subgreddit1.save();
    }
    subgreddit1.leftusers.push(req.body.id);
    res.json("left subgreddit");
  } catch (err) {
    console.log(err.message);
  }
});

// create a post request to join a subgreddit by a user in both  user schema and subgreddit schema
router.post("/join/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const subgreddit1 = await SubGreddit.findById(req.params.id);
    const usersignedup = await user.findById(req.body.id);
    if (subgreddit1.Members.includes(req.body.id)) {
      res.json("you are already a member of this subgreddit");
    } else if (subgreddit1.leftusers.includes(req.body.id)) {
      res.json("you have left this subgreddit so you can't join again");
    } else if (subgreddit1.Requests.includes(req.body.id)) {
      res.json("you have already sent a request to join this subgreddit");
    } else {
      subgreddit1.Requests.push(req.body.id);
      await subgreddit1.save();
      res.json("request sent");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
