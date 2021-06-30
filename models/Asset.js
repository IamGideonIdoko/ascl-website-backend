const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define Asset schema.
const AssetSchema = new Schema({
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
	category: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

// Create Asset model.
const Asset = mongoose.model('Asset', AssetSchema);


module.exports = Asset;
