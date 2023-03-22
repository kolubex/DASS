// this verifies the user's signin
// Compare this snippet from backend1/routes/signInandUp.js:
const router = require("express").Router();
const user = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
    try{
        const decodedtoken = jwt.verify(req.body.id, process.env.SECRET);
        if(!decodedtoken){
            return res.status(401).json({error: "token missing or invalid"});
        }
        const usersignedin = await user.findById(decodedtoken.id);
        if(usersignedin){
            res.json("true");
        }
        else
        {
            res.json("false")
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;