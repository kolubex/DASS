const mongoose = require('mongoose');
const user = require('./user.js');

const Posts = new mongoose.Schema({
    Content:{
        type:String,
        required:true
    },
    PostedSubgreddit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subgreddits',
        required:true
    },
    PostedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    Upvotes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'users',
        required:true
    },
    Downvotes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'users',
        required:true
    },
    Comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'comments',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('posts',Posts);