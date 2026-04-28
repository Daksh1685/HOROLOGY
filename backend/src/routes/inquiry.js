const express = require('express');
const router = express.Router();
const { sendInquiry } = require('../controllers/inquiryController');

router.post('/', sendInquiry);

module.exports = router;
