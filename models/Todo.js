const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Todo', TodoSchema);