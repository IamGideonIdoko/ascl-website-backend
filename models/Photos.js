const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define Photo schema.
const PhotoSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	url: {
		type: String,
		required: true
	},
	size: {
		type: Number
	},
	file_type: {
		type: String
	},
	author_username: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

// Create Photo model.
const Photo = mongoose.model('Photo', PhotoSchema);


module.exports = Photo;
