const mongoose = require("mongoose");
const validator = require("validator");
const SubGreddit = require("./SubGreddit.js");
const Posts = require("./Posts.js");
const bcrypt = require("bcrypt");
const user = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  Age: {
    type: Number,
    required: true,
  },
  Contact: {
    type: String,
    required: true,
    //validating contact number
    validate: {
      validator: validator.isMobilePhone,
      message: "{VALUE} is not a valid phone number",
      isAsync: false,
    },
  },
  Password: {
    type: String,
    required: true,
    validate: {
      validator: validator.isStrongPassword,
      message: "{VALUE} is not a strong password",
      isAsync: false,
    },
  },
  HerSubgreddits: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subgreddits",
  },
  Following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  Followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  creations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "posts",
  },
  SavedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "posts",
  },
  Joinedsubgreddits: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subgreddits",
  },
  Reports : {
    type : [mongoose.Schema.Types.ObjectId],
    ref : 'reports',
    default : [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

user.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
user.methods.validPassword = function (password) {
  if (this.Password != null) {
    console.log(password);
    console.log(bcrypt.compareSync(password, this.Password))
    return bcrypt.compareSync(password, this.Password);
  } else return false;
};

module.exports = mongoose.model("users", user);
