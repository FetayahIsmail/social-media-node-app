const express  = require("express");
const router = express.Router()
const userController = require('./controller/user-controller');
router.get('/',userController.home)
router.post('/register',userController.register)
module.exports = router