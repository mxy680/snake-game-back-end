const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    snakeColor: {
        type: String,
        default: 'green'
    },
    foodColor: {
        type: String,
        default: 'red'
    },
    backgroundColor: {
        type: String,
        default: 'black'
    },
    gameSpeed: {
        type: Number,
        default: 10
    },
    gameSize: {
        type: Number,
        default: 20
    }
});

module.exports = mongoose.model('Settings', settingsSchema);