const mongoose = require('mongoose');
const Watch = require('./models/Watch');

const seedWatches = [
  {
    name: 'Speedmaster Moonwatch Professional',
    brand: 'Omega',
    model: '310.30.42.50.01.002',
    price: 72000,
    style: 'sport',
    description: 'The legendary Moonwatch Professional with professional studio photography.',
    images: [{ url: '/omega-speedmaster.jpg', alt: 'Omega Speedmaster' }],
    specifications: { caseMaterial: 'Stainless Steel', caseDiameter: '42mm', movement: 'Calibre 3861', waterResistance: '50m' },
    featured: true,
  },
  {
    name: 'Nautilus Heritage',
    brand: 'Patek Philippe',
    model: '5711/1A-010',
    price: 145000,
    style: 'dress',
    description: 'The iconic Nautilus with its horizontal embossed blue-grey dial.',
    images: [{ url: '/patek-nautilus.png', alt: 'Patek Philippe Nautilus' }],
    specifications: { caseMaterial: 'Stainless Steel', caseDiameter: '40mm', movement: 'Calibre 26-330 S C', waterResistance: '120m' },
    featured: true,
  },
  {
    name: "Submariner 'Diamond' Date",
    brand: 'Rolex',
    model: '126610LN',
    price: 68500,
    style: 'diver',
    description: 'A bespoke diamond-set edition of the quintessential diver\'s watch.',
    images: [{ url: '/rolex-submariner.jpg', alt: 'Rolex Submariner Diamond' }],
    specifications: { caseMaterial: 'Oystersteel', caseDiameter: '41mm', movement: 'Calibre 3235', waterResistance: '300m' },
    featured: true,
  },
  {
    name: "Royal Oak 'Jumbo' Extra-Thin",
    brand: 'Audemars Piguet',
    model: '15202ST',
    price: 85000,
    style: 'sport',
    description: 'The definitive luxury sports watch in its purest form.',
    images: [{ url: '/ap-jumbo.jpg', alt: 'AP Royal Oak' }],
    specifications: { caseMaterial: 'Stainless Steel', caseDiameter: '39mm', movement: 'Calibre 2121', waterResistance: '50m' },
    featured: true,
  },
  {
    name: 'Overseas Dual Time',
    brand: 'Vacheron Constantin',
    model: '7900V/110A-B334',
    price: 32000,
    style: 'sport',
    description: 'A versatile travel companion from the oldest continuous watchmaker.',
    images: [{ url: '/vc-overseas.jpg', alt: 'VC Overseas' }],
    specifications: { caseMaterial: 'Stainless Steel', caseDiameter: '41mm', movement: 'Calibre 5110 DT', waterResistance: '150m' },
    featured: true,
  },
  {
    name: 'RM 67-02 High Jump',
    brand: 'Richard Mille',
    model: 'RM 67-02',
    price: 245000,
    style: 'sport',
    description: 'The technical masterpiece designed for high-performance athletes.',
    images: [{ url: '/rm-67.jpg', alt: 'RM 67-02' }],
    specifications: { caseMaterial: 'Quartz TPT', caseDiameter: '38.7mm', movement: 'CRMA7', waterResistance: '30m' },
    featured: true,
  }
];

const seedDB = async () => {
  try {
    await Watch.deleteMany({});
    await Watch.insertMany(seedWatches);
    console.log('🌱 Horology database refreshed with all masterpiece assets');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  }
};

module.exports = seedDB;
