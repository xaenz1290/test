const itemController = require('../../controllers/item');
const router = require('express').Router();

module.exports = router
    .get('/', itemController.index)
    .post('/', itemController.create)
    .put('/:id', itemController.update)

    