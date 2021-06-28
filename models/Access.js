const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define Access schema.
const AccessSchema = new Schema({
	access_name: {
		type: String,
		required: true
	},
	access_key: {
		type: String,
		required: true
	},
	is_valid: {
		type: Boolean,
        default: true
	},
    created_by: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create Access model.
const Access = mongoose.model('Access', AccessSchema);


module.exports = Access;
