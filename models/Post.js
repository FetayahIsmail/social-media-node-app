const postCollection = require('../db').db().collection('posts');
const ObjectId = require('mongodb').ObjectID
class Posts {
    constructor(data,userid){
        this.data=data,
        this.errors=[],
        this.userid=userid
    }
    cleanUp(){
        if(typeof(this.data.body)!='string'){this.data=''}
        this.data={
            body:this.data.body.trim(),
            author:ObjectId(this.userid),
            newDate: new Date()
        }
    }
    validation(){
        if(this.data.body==''){errors.push('you must provide a Post text')}
    }
    create(){
        return new Promise(async(resolve,reject)=>{
            this.cleanUp()
            this.validation()
            if (!this.errors.length) {
                try {
                    await postCollection.insertOne(this.data)
                    resolve()
                } catch (error) {
                    this.errors.push(error)
                }
            } else {
                reject(this.errors)
            }
        })
    }
    findPostById(id){
        return new Promise(async(resolve,reject)=>{
            if(typeof(id)!='string'||!ObjectId.isValid(id)){
                reject('links')
                return
            }
            let post = await postCollection.findOne({_id:new ObjectId(id)})
            if(post){
                resolve(post)
            }
            else{
                reject('ddd')
            }
        })
        
    }
}
module.exports=Posts