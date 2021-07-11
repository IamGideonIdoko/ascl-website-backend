const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Page Schema.
const MgmtProfileSchema = new Schema({
    position: {
		type: String,
		required: true,
		unique: true
	},
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
	about: {
		type: String,
		required: true
	},
    position_level: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});

// Create Page Model.
const MgmtProfileModel = mongoose.model('Page', MgmtProfileSchema);


module.exports = MgmtProfileModel;