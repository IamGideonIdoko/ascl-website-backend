const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define Document schema.
const DocumentSchema = new Schema({
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
		type: Number,
		required: true
	},
	file_type: {
		type: String,
		required: true
	},
	author_username: {
		type: String,
		required: true,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

// Create Document model.
const Document = mongoose.model('Document', DocumentSchema);


module.exports = Document;
