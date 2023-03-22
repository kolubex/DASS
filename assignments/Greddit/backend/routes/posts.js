const express = require("express");
const { Mongoose, Schema, Types } = require("mongoose");
const router = express.Router();
const SubGreddit = require("../models/SubGreddit.js");
const user = require("../models/user.js");
const Posts = require("../models/Posts.js");
const Reports = require("../models/Report.js");
const Comments = require("../models/Comments.js");

router.post("/uploadpost/:id", async (req, res) => {
  try {
    const subgreddit1 = await SubGreddit.findById(req.params.id);
    console.log(subgreddit1);
    const post = new Posts({
      Content: req.body.Content,
      PostedSubgreddit: subgreddit1._id,
      PostedBy: req.body.PostedBy,
      Upvotes: [],
      Downvotes: [],
      Comments: [],
      Reports: [],
    });
    // if banned words of subgreddit are in the content of the post then replace with *
    const bannedwords = subgreddit1.BannedWords;
    if (bannedwords.length > 0) {
      for (let i = 0; i < bannedwords.length; i++) {
        const regex = new RegExp(bannedwords[i], "gi");
        post.Content = post.Content.replace(regex, "*****");
      }
    }
    const savedpost = await post.save();
    subgreddit1.Posts.push(savedpost._id);
    await subgreddit1.save();
    res.json(savedpost);
  } catch (err) {
    console.log(err.message);
  }
});

// upvote a post by a user in body, post id in params
router.post("/upvote/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const user1 = await user.findById(req.body.id);
    // if user has already upvoted the post then remove the upvote
    console.log("here");
    if (post.Upvotes.includes(user1._id)) {
      post.Upvotes = post.Upvotes.filter((id) => id.toString() != user1._id);
      console.log("case 1", post.Upvotes);
      await post.save();
      console.log(post);
      res.json(post);
      // if user has already downvoted the post then remove the downvote and add upvote
    } else if (post.Downvotes.includes(user1._id)) {
      post.Downvotes = post.Downvotes.filter(
        (id) => id.toString() != user1._id
      );
      console.log(post.Downvotes);
      post.Upvotes.push(user1._id);
      console.log("case 2");
      await post.save();
      console.log(post);
      res.json(post);
      // if user has not upvoted or downvoted the post then add upvote
    } else {
      post.Upvotes.push(user1._id);
      await post.save();
      console.log("case 3");
      console.log(post);
      res.json(post);
    }
  } catch (err) {
    console.log(err.message);
  }
});

// similarly for downvote
router.post("/downvote/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const user1 = await user.findById(req.body.id);
    // console log all the downvotes of the post with a map
    console.log(post.Downvotes.map((id) => id.toString()));
    // if user has already downvoted the post then remove the downvote
    console.log("here");
    if (post.Downvotes.includes(user1._id)) {
      post.Downvotes = post.Downvotes.filter(
        (id) => id.toString() != user1._id
      );
      await post.save();
      console.log(post);
      res.json(post);
      // if user has already upvoted the post then remove the upvote and add downvote
    } else if (post.Upvotes.includes(user1._id)) {
      post.Upvotes = post.Upvotes.filter((id) => id.toString() != user1._id);
      post.Downvotes.push(user1._id);
      await post.save();
      console.log(post);
      res.json(post);

      // if user has not upvoted or downvoted the post then add downvote
    } else {
      post.Downvotes.push(user1._id);
      await post.save();
      console.log(post);
      res.json(post);
    }
  } catch (err) {
    console.log(err.message);
  }
});

// follow the user who posted the post with users id in body and person to be followed in params
router.post("/follow/:id", async (req, res) => {
  try {
    const tobeFollowed = await user.findById(req.params.id);
    const loggedinuser = await user.findById(req.body.id);
    console.log(tobeFollowed, loggedinuser, "users");
    console.log(tobeFollowed, loggedinuser, "users");
    // if user is already following the person then avoid the follow else add the follow
    if (
      !(
        loggedinuser.Following.includes(tobeFollowed._id) ||
        req.body.id == req.params.id
      )
    ) {
      loggedinuser.Following.push(tobeFollowed._id);
      await loggedinuser.save();
      tobeFollowed.Followers.push(loggedinuser._id);
      await tobeFollowed.save();
      res.json("followed");
      console.log(loggedinuser);
    } else {
      res.json("already following or you cant follow yourself");
    }
  } catch (err) {
    console.log(err.message);
  }
});

// save a post with users id in body and post id in params and the post id to their SavedPosts array
router.post("/save/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const user1 = await user.findById(req.body.id);
    // add the post only if the post id is not already present in the SavedPosts array
    if (!user1.SavedPosts.includes(post._id)) {
      user1.SavedPosts.push(post._id);
      await user1.save();
      res.json(user1);
      console.log(user1);
    } else {
      res.json(user1);
    }
    console.log(user1);
  } catch (err) {
    console.log(err.message);
  }
});

// report a post with users id in body and post id in params and add the post id to reports array in the PostedSubgreddit
router.post("/report/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const user1 = await user.findById(req.body.id);
    const subgreddit1 = await SubGreddit.findById(post.PostedSubgreddit);
    console.log(post.PostedBy, subgreddit1.Moderator);
    if (post.PostedBy.toString() !== subgreddit1.Moderator.toString()) {
      const report = new Reports({
        ReportedBy: user1._id,
        Post: post._id,
        Subgreddit: post.PostedSubgreddit,
        Concern: req.body.Concern,
        ReportedTo: post.PostedBy,
      });
      // add the report to the ReportedSubgreddit
      subgreddit1.Reports.push(report._id);
      report.save();
      await subgreddit1.save();
      // add the report to the ReportedBy user
      user1.Reports.push(report._id);
      await user1.save();
      console.log(report);
      res.json("reported");
    } else {
      res.json("you cant report Moderators post");
    }
  } catch (err) {
    res.json(err.message);
  }
});

// add a comment to a post with the postid and the comment in body and userid in body
router.post("/comment/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    // find the user who commented
    // const user1 = user.findById(req.body.id);
    // console.log(user1);
    const pseudocomment = new Comments({
      postedby: "Person1",
      comment: req.body.comment,
      postid: post._id
    });
    pseudocomment.save();
    post.Comments.push(pseudocomment._id);
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
  }
});

// create a post comment to send all comments for a post with post id in params
router.get("/comment/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const comments = post.Comments;
    response = [];
    comments.forEach((comment) => {
      response.push({
        user: comment.postedby,
        comment: comment.comment,
      });
    });
    res.json(comments);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
