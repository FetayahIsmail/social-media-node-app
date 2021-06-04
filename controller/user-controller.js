const User = require('../models/User');
exports.home = (req,res)=>{
    if (req.session.user) {
      res.render('login',{username:req.session.user.user,})
    } else {
      res.render('home-g',{errors:req.flash('errors'),regErrors:req.flash('regErrors')})
    }
}
exports.register = (req,res)=>{
    let user = new User(req.body)
    user.register().then((result) => {
      req.session.user = {user:user.data.username}
      req.session.save(()=>res.redirect('/'))
    }).catch((err) => {
        user.errors.forEach(function(e){
          req.flash('regErrors',e)
          req.session.save(()=>res.redirect('/'))
        })
    });
}
exports.login = async (req,res)=>{
    let user = new User(req.body)
    try {
      let result=await user.login()
      req.session.user = {user:user.data.username}
      req.session.save(()=>res.redirect('/'))
    } catch (error) {
      req.flash('errors',error)
      req.session.save(()=>res.redirect('/'))
    }
}
exports.logout =  (req,res)=>{
  req.session.destroy(()=>res.redirect('/'))
}