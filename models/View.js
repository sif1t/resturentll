var mongoosedb = require('../config/dbconfig');


let date = new Date();
date = date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// View Schema
var ViewSchema = mongoosedb.Schema({
    postid: {
        type: String,
        index: true,
    },
    userip: {
        type: String,
    },
    method: {
        type: String,
    },
    host: {
        type: String,
    },
    url: {
        type: String,
    },
    referer: {
        type: String,
    },
    user_agent: {
        type: String,
    },
    country: {
        type: String,
    },
    device: {
        type: String,
    },
    platform: {
        type: String,
    },
    operating: {
        type: String,
    },
    browser: {
        type: String,
    },
    browser_version: {
        type: String,
    },
    time_zone: {
        type: String,
    },
    asn: {
        type: String,
    },
    asn_org: {
        type: String,
    },
    date_at: {
        type: String,
        default: date,
    },
});

var View = module.exports = mongoosedb.model('View', ViewSchema);