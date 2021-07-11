const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Page Schema.
const FaqsSchema = new Schema({
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
const FaqsModel = mongoose.model('Page', FaqsSchema);


module.exports = FaqsModel;