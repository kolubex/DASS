const express = require("express");
const { Mongoose, Schema, Types, default: mongoose } = require("mongoose");
const router = express.Router();
const SubGreddit = require("../models/SubGreddit.js");
const Posts = require("../models/Posts.js");
const user = require("../models/user.js");
const Report = require("../models/Report.js");
const moment = require("moment");
router.post("/create/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const subgreddit = await SubGreddit.findById(post.PostedSubgreddit);
    if (post.PostedBy !== subgreddit.Moderator) {
      const report = new Report({
        reportedby: req.body.id,
        reportedto: post.PostedBy,
        post: req.params.id,
        concern: req.body.concern,
        status: req.body.status,
      });
      const Report = await report.save();
      subgreddit.Reports.push(Report._id);
      await subgreddit.save();
      res.json("Reported");
    } else {
      res.json({ message: "You can't report Moderators post" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getreports/:id", async (req, res) => {
  try {
    const subgreddit = await SubGreddit.findById(req.params.id);

    // populate all the reports in a subgreddit and send the response
    const reports = await Report.find({
      _id: { $in: subgreddit.Reports },
    }).populate("ReportedBy");
    const response = [];
    console.log(reports);
    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      // only select those reports which are pending and reported from last 5 days and remaining post ignore them
      if (
        report.Status !== "deleted" &&
        moment(report.date).isAfter(moment().subtract(5, "days"))
      ) {
        // get the content of the post which is reported
        const contentinpost = await Posts.findById(report.Post.toString()).select("Content");
        // const contentinpost = report.Post.populate("Content");
        // get the username of the user who is reported
        const reportedtouser = await user.findById(report.ReportedTo).select("UserName");
        response.push({
          id: report._id,
          reportedBy: report.ReportedBy.UserName,
          abuser: reportedtouser,
          concern: report.Concern,
          post: contentinpost,
          time: report.date,
          status: report.Status,
        });
      }
    }
    console.log(response);
    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
});

// adding the abuser to blocked list of the subgreddit
router.post("/blockuser/:id", async (req, res) => {
  try {
    const subgreddit = await SubGreddit.findById(req.params.id);
    const report = await Report.findById(req.body.id);
    subgreddit.BlockedUsers.push(report.ReportedTo);
    report.Status = "blocked";
    await subgreddit.save();
    await report.save();
    console.log(report);
    res.json({ message: "user blocked" });
  } catch (err) {
    res.json({ message: err });
  }
});

// delete the post from the subgreddit
router.post("/deletepost/:id", async (req, res) => {
    try {
        const subgreddit = await SubGreddit.findById(req.params.id);
        const report = await Report.findById(req.body.id);
        const index = subgreddit.Posts.indexOf((report._id).toString());
        subgreddit.Posts.splice(index, 1);
        report.Status = "deleted";
        console.log(report);
        // delete the total post from the database
        await Posts.findByIdAndDelete(report.Post);
        await subgreddit.save();
        await report.save();
        res.json({message: "post deleted"});
    } catch (err) {
        res.json({message: err});
    }
});

// ignore the report and mark it as ignored
router.post("/ignorepost/:id", async (req, res) => {
    try {
          const subgreddit = await SubGreddit.findById(req.params.id);
          const report = await Report.findById(req.body.id);
          report.Status = "ignored";
          await subgreddit.save();
          await report.save();
          res.json({message: "report ignored"});
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;
