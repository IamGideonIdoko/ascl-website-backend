const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Page Schema.
const GallerySchema = new Schema({
    cover_img: {
		type: String,
		required: true
	},
	caption: {
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
const GalleryModel = mongoose.model('Page', GallerySchema);


module.exports = GalleryModel;