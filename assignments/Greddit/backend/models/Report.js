// creating report schema for mongodb for a post in a subgreddit by a user with a concern over a post
const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
    // user id of the user who reported the post
    ReportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // reported whom
    ReportedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // post id of the post that was reported
    Post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    // status of the report
    Status: {
        type: String,
        default: 'pending',
        // status -> "ignored", "deleted", "blocked", "pending"
        required: true
    },
    // concern of the user who reported the post
    Concern: {
        type: String,
        required: true
    },
    // subgreddit id of the subgreddit in which the post was reported
    Subgreddit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subgreddits',
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);