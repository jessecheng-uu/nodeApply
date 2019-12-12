const router = require('express').Router();

const userController = require('../Controllers/userController.js')

router.post('/', userController.create);

router.get('/', userController.show);

router.get('/:id', userController.fetch);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

module.exports = router;