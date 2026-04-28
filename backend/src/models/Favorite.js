const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  watch: { type: mongoose.Schema.Types.ObjectId, ref: 'Watch', required: true },
  collectionName: { type: String, default: 'My Collection', trim: true },
  notes: { type: String, maxlength: 500, default: '' },
  isWishlist: { type: Boolean, default: false },
}, { timestamps: true });

favoriteSchema.index({ user: 1, watch: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
