const validator = require('validator');
const userCollection = require('../db').collection('users')
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
         if (this.data.username == '') {this.errors.push('you must should entre a name')}
         if (!validator.isEmail(this.data.email)) {this.errors.push('you must should entre an email')}
         if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)) {this.errors.push('user name should include only lettres and numbers')}
         if (this.data.password == '') {this.errors.push('you must should entre a password')}
         if (this.data.password.length > 0 && this.data.password.length < 4) {this.errors.push('your password must be more than 3 characters')}
         if (this.data.password.length > 20) {this.errors.push('your password must be less than 12 characters')}
         if (this.data.username.length > 0 && this.data.username.length < 4) {this.errors.push('your username must be more than 3 characters')}
         if (this.data.username.length > 12) {this.errors.push('your username must be more than 3 characters')}
     }
     register(){
        this.cleanUp()
        this.validation()
        if (!this.errors.length) {
            userCollection.insertOne(this.data)
        }
     }
     login(){
       return new Promise((resolve,reject)=>{
         this.cleanUp()
         userCollection.findOne({username:this.data.username}).then((findObject) => {
          if (findObject && findObject.password == this.data.password) {
            resolve('taher')
          } else {
           reject('klk')
          }
         }).catch((err) => {
          reject('klk')
         });
       })
     }
}
module.exports = User