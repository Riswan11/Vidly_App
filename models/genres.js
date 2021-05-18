const { model } = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    movieType: {
        type: String,
        required: true
    },
    movieName: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;