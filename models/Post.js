var mongoosedb = require('../config/dbconfig');


let date = new Date();
date = date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

// Post Schema
var PostSchema = mongoosedb.Schema({
    slug: {
        type: String,
        index: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    tag: {
        type: String,
    },
    featured_image: {
        type: String,
    },
    author: {
        type: String,
    },
    seo_description: {
        type: String,
    },
    seo_keywords: {
        type: String,
    },
    view: {
        type: Number, default: 0,
    },
    date_at: {
        type: String,
        default: date,
    },
});

var Post = module.exports = mongoosedb.model('Post', PostSchema);