const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedbackText: {
        type: String,
        required: true,
    },
    userLoginId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'login_tb', 
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant_tb',  
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,   
    },
});

const Feedback = mongoose.model('feedback_tb', feedbackSchema);

module.exports = Feedback; 