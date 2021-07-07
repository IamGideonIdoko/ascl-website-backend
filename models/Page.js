const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Page Schema.
const PageSchema = new Schema({
    title: {
		type: String,
		required: true,
		unique: true
	},
    slug: {
        type: String,
        required: true,
        unique: true
    },
    cover_img: String,
    author_username: String,
	body: {
		type: String,
		required: true
	},
    category: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});

// Create Page Model.
const PageModel = mongoose.model('Page', PageSchema);


module.exports = PageModel;