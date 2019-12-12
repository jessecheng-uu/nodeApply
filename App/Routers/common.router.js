const router = require('express').Router();

const commonController = require('../Controllers/commonController.js')

router.post('/upload', commonController.upload);

module.exports = router;
