const Watch = require('../models/Watch');

exports.getWatches = async (req, res) => {
  try {
    const { brand, style, minPrice, maxPrice, search, featured, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (style) filter.style = style;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (featured === 'true') filter.featured = true;
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Watch.countDocuments(filter);
    const watches = await Watch.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / Number(limit)), data: watches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWatchById = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id);
    if (!watch) return res.status(404).json({ success: false, message: 'Watch not found' });
    res.json({ success: true, data: watch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createWatch = async (req, res) => {
  try {
    const watch = await Watch.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: watch });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateWatch = async (req, res) => {
  try {
    const watch = await Watch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!watch) return res.status(404).json({ success: false, message: 'Watch not found' });
    res.json({ success: true, data: watch });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteWatch = async (req, res) => {
  try {
    const watch = await Watch.findByIdAndDelete(req.params.id);
    if (!watch) return res.status(404).json({ success: false, message: 'Watch not found' });
    res.json({ success: true, message: 'Watch deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
