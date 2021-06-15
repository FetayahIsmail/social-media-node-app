const Posts = require('../models/Post');
exports.create=(req,res)=>{
    const post = new Posts(req.body,req.session.user._id)
    post.create().then((result) => {
        res.send('it works')
    }).catch((err) => {
        res.send('it not works')
    });
}
exports.viewSingle=async(req,res)=>{
    try {
        let pots =new Posts()
        let post =  await pots.findPostById(req.params.id)
        res.render('post',{post:post})
    } catch  {
        res.render('error')
    }
}