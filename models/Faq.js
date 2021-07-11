const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Faq Schema.
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

// Create Faq Model.
const FaqModel = mongoose.model('Faq', FaqSchema);


module.exports = FaqModel;