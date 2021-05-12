const User = require('../models/User');
exports.home = (req,res)=>{
    res.render('home-g')
}
exports.register = (req,res)=>{
    let user = new User(req.body)
    user.rty()
    res.send('thanks')
}