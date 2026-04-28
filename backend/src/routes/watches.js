const express = require('express');
const router = express.Router();
const { getWatches, getWatchById, createWatch, updateWatch, deleteWatch } = require('../controllers/watchController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getWatches);
router.get('/:id', getWatchById);
router.post('/', protect, adminOnly, createWatch);
router.put('/:id', protect, adminOnly, updateWatch);
router.delete('/:id', protect, adminOnly, deleteWatch);

module.exports = router;
