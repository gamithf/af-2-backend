const express = require('express');
const { auth } = require('../middleware/auth/auth');
const { getFavourites, addFavourites, deleteFavourites }  = require("../controllers/favouritesController");

const router = express.Router();
router.get('/get-favourites', auth(['user']), getFavourites);
router.post('/add-favourites', auth(['user']), addFavourites);
router.delete('/delete-favourites', auth(['user']), deleteFavourites);

module.exports = router;
