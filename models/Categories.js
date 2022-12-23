var mongoosedb = require('../config/dbconfig');

let date = new Date();
date = date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

// Category Schema
var CategorieSchema = mongoosedb.Schema({
    slug: {
        type: String,
        index: true,
    },
    title: {
        type: String,
    },
    parent_cat: {
        type: String,
    },
    seo_description: {
        type: String,
    },
    seo_keywords: {
        type: String,
    },
    date_at: {
        type: String,
        default: date,
    },
});

var Categories = module.exports = mongoosedb.model('Categories', CategorieSchema);