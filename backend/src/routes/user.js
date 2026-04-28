const express = require('express');
const router = express.Router();
const { getMe, updateMe, getFavorites, addFavorite, removeFavorite, trackViewed, getViewed } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/me', getMe);
router.put('/me', updateMe);
router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:watchId', removeFavorite);
router.post('/viewed/:watchId', trackViewed);
router.get('/viewed', getViewed);

module.exports = router;
