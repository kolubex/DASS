const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  try {
    const usersignedup = new user({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      UserName: req.body.UserName,
      Email: req.body.Email,
      Age: req.body.Age,
      Contact: req.body.Contact,
      Password: req.body.Password,
    });
    usersignedup.Password = await usersignedup.encryptPassword(
      req.body.Password
    );

    await usersignedup
      .save()
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const usersignedup = await user.findOne({ Email: req.body.Email });
    console.log(req.body.Password);
    if(usersignedup.validPassword(req.body.Password)){
      console.log("password matched");
    }
    else{
      console.log("password not matched");
    }
    const userForToken = {
      id: usersignedup._id,
      email: usersignedup.Email
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({token, id: usersignedup._id, username: usersignedup.UserName});
  } catch (err) {
    console.log(err.message);
  }
});



module.exports = router;