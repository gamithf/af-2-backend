const mongoose = require('mongoose');

const FavouritesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Favourites', FavouritesSchema);