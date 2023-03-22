const mongoose = require ('mongoose')
const user = require('./user.js')
const Posts = require('./Posts.js')
const SubGreddit = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Tags:{
        type:[String],
        required:true
    },
    BannedWords:{
        type:[String],
        required:true
    },
    Moderator :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    Members :
    {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'users'
    },
    Requests :
    {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'users'
    },
    Posts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'posts',
        required:true
    },
    Reports:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'reports',
        required:true
    },
    BlockedUsers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'users',
        default:[],
        required:true
    },
    leftusers:{
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'users',
        default:[],        
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('subgreddits',SubGreddit)