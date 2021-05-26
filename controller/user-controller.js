const User = require('../models/User');
exports.home = (req,res)=>{
    res.render('home-g')
}
exports.register = (req,res)=>{
    let user = new User(req.body)
    user.register()
    user.errors.length == 0 ? console.log('good'):console.log('error')
    res.send('thanks')
}
exports.login = (req,res)=>{
    let user = new User(req.body)
    user.login().then((result) => {
      res.send(result)
    }).catch((err) => {
      res.send(err)
    });
}