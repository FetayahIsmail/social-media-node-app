const validator = require('validator');
const userCollection = require('../db').db().collection('users')
class User {
    constructor(data){
        this.data=data,
        this.errors = []
    }
    cleanUp(){
      if(typeof(this.data.username) != 'string' ){this.data.username=""}
      if(typeof(this.data.email) != 'string' ){this.data.email=""}
      if(typeof(this.data.password) != 'string' ){this.data.username=""}
      this.data={
          username:this.data.username.trim().toLowerCase(),
          email: this.data.email.trim().toLowerCase(),
          password:this.data.password
      }
  }
     validation(){
       return new Promise(async(resolve,reject)=>{
          if (this.data.username == '') {this.errors.push('you must entre a name')}
          if (!validator.isEmail(this.data.email)) {this.errors.push('you must  entre an email')}
          if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)) {this.errors.push('user name should include only lettres and numbers')}
          if (this.data.password == '') {this.errors.push('you must should entre a password')}
          if (this.data.password.length > 0 && this.data.password.length < 4) {this.errors.push('your password must be more than 3 characters')}
          if (this.data.password.length > 20) {this.errors.push('your password must be less than 12 characters')}
          if (this.data.username.length > 0 && this.data.username.length < 4) {this.errors.push('your username must be more than 3 characters')}
          if (this.data.username.length > 12) {this.errors.push('your username must be more than 3 characters')}
          //////////////only if username valid///////////////
          if (this.data.username.length>2 && this.data.username<12  && validator.isAlphanumeric(this.data.username)) {
            let userExists = await userCollection.findOne({username:this.data.username})
            if (userExists) {this.errors.push('sorry this username is already token')}
          }
          //////////////only if username valid///////////////
          if (validator.isEmail(this.data.email)) {
            let emailExists = await userCollection.findOne({email:this.data.email})
            if (emailExists) {this.errors.push('sorry this email is already token')}
          }
          resolve()
       })
         
     }
     register(){
       return new Promise(async (resolve,reject)=>{
         this.cleanUp()
        await this.validation()
        if (!this.errors.length) {
            await userCollection.insertOne(this.data)
            resolve()
        }
        else{
          reject(this.errors)
        }
       })
        
     }
     login(){
       return new Promise((resolve,reject)=>{
         this.cleanUp()
         userCollection.findOne({username:this.data.username}).then((findObject) => {
          if (findObject && findObject.password == this.data.password) {
            resolve(findObject)
          } else {
           reject('sorry your password or username is wrong')
          }
         }).catch((err) => {
          reject('sorry your password or username is wrong')
         });
       })
     }
}
module.exports = User