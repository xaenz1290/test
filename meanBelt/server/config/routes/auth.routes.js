const authController = require('../../controllers/auth')
const router = require('express').Router();

module.exports = router
    .get('/', authController.index)
    .get('/one', authController.getOne)
    .post('/login', authController.login)
    .delete('/logout', authController.logout)
    .get('/', authController.logout)
    .get('/:id', authController.show)
