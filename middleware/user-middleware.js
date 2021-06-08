exports.mustBeLogin = (req,res,next)=>{
    if (req.session.user) {
      next()
    } else {
      req.flash('errors','you must be login first')
      req.session.save(()=>res.redirect('/'))
    }
  }
exports.sessionDeta=(req,res,next)=>{
    res.locals.user = req.session.user
    next()
}