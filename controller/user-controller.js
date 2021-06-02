const User = require('../models/User');
exports.home = (req,res)=>{
    if (req.session.user) {
      res.render('login',{username:req.session.user.user})
    } else {
      res.render('home-g')
    }
}
exports.register = (req,res)=>{
    let user = new User(req.body)
    user.register()
    user.errors.length == 0 ? console.log('good'):console.log('error')
    res.send('thanks')
}
exports.login = async (req,res)=>{
    let user = new User(req.body)
    try {
      let result=await user.login()
      req.session.user = {user:user.data.username}
      req.session.save(()=>res.redirect('/'))
    } catch (error) {
      res.send(error)
    }
}
exports.logout =  (req,res)=>{
  req.session.destroy(()=>res.redirect('/'))
}