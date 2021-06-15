const express  = require("express");
const router = express.Router()
const userController = require('./controller/user-controller');
const postController = require('./controller/post-controller');
const middleware = require('./middleware/user-middleware');
///user Route///
router.get('/',userController.home)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/logout',userController.logout)
///post Route///
router.post('/create-post',middleware.mustBeLogin,postController.create)
router.get('/post/:id',middleware.mustBeLogin,postController.viewSingle)
module.exports = router