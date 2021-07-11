const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Page Schema.
const FaqSchema = new Schema({
    question: {
		type: String,
		required: true
	},
    answer: {
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
const FaqModel = mongoose.model('Page', FaqSchema);


module.exports = FaqModel;