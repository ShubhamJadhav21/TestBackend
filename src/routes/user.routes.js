const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post("/user", userController.createUser)
router.get("/users", userController.getUser)
router.get("/users/:_id", userController.getUserById)


module.exports = router