let router      = require('express').Router()

let UsersService   = require('../services/users.service')

router.post('/signin', UsersService.signin)

router.post('/signup', UsersService.signup)

router.get('/list', UsersService.list)  // Not for Student

router.put('/modify', UsersService.modify)

router.delete('/:id', UsersService.deleteUser)   //Pedago Only

router.get('/:id', UsersService.getInfo)


module.exports = router
