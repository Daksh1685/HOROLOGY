const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Watch name is required'], trim: true },
  brand: { type: String, required: [true, 'Brand is required'], trim: true, index: true },
  model: { type: String, required: [true, 'Model is required'], trim: true },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  currency: { type: String, default: 'USD' },
  style: { type: String, enum: ['dress', 'sport', 'diver', 'pilot', 'complication', 'casual'], required: true },
  description: { type: String, required: true, maxlength: 2000 },
  images: [{ url: { type: String, required: true }, alt: { type: String, default: '' } }],
  specifications: { caseDiameter: String, caseThickness: String, caseMaterial: String, dialColor: String, movement: String, powerReserve: String, waterResistance: String, crystal: String, bracelet: String, functions: [String] },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  limitedEdition: { type: Boolean, default: false },
  year: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

watchSchema.index({ brand: 1, style: 1 });
watchSchema.index({ price: 1 });
watchSchema.index({ name: 'text', brand: 'text', model: 'text' });

module.exports = mongoose.model('Watch', watchSchema);
