const Favourites = require('../models/Favourites');

const getFavourites = async (req, res, next) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const favourites = await Favourites.find({ userId });

        res.status(200).json({ favourites });
    } catch (error) {
        next(error);
    }
};

const addFavourites = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { countryCode } = req.body;
        if (!userId || !countryCode) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const favourite = await Favourites.create({ userId, countryCode });
        res.status(201).json({ favourite });
    } catch (error) {
        next(error);
    }
};
const deleteFavourites = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { countryCode } = req.body;
        if (!userId || !countryCode) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        await Favourites.deleteOne({ userId, countryCode });
        res.status(200).json({ message: 'Favourite deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFavourites,
    addFavourites,
    deleteFavourites,
};