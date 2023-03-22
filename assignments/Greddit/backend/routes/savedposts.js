const express = require("express");
const { Mongoose,Schema,Types, default: mongoose } = require("mongoose");
const router = express.Router();
const Posts = require("../models/Posts.js");
const user = require("../models/user.js");
const SubGreddit = require("../models/SubGreddit.js");


// request to send saved posts details after populating them of a user
router.get("/:id", async (req, res) => {
    try {
        const user1 = await user.findById(req.params.id);
        const posts =  (await Posts.find({ _id: { $in: user1.SavedPosts } }))
        const temp = posts.length;
        for (let i = 0; i < temp; i++) {
            const user2 = await user.findById(posts[i].PostedBy);
            const subgreddit = await SubGreddit.findById(posts[i].PostedSubgreddit);
            posts[i] = { ...posts[i]._doc, username: user2.UserName};
            posts[i] = { ...posts[i], subgredditname: subgreddit.Title};
        }
        console.log(posts);
        res.json(posts);
        
    } catch (err) {
        res.json(err);
    }
});

// request to remove a post from saved posts list of a user
router.post("/delete/:id", async (req, res) => {
    try {
        console.log(req.body.id);
        const user1 = await user.findById(req.body.id);
        const posts = await Posts.findById(req.params.id);
        console.log(user1);
        const index = user1.SavedPosts.indexOf((posts._id));
        user1.SavedPosts.splice(index, 1);
        await user1.save();
        console.log(user1);
        res.json("deleted");
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;