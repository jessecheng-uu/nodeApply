const router = require('express').Router();

const loginController = require('../Controllers/loginController.js')

router.post('/', loginController.login);

module.exports = router;
