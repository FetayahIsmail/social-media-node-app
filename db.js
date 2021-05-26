const mongodb = require('mongodb');
require('dotenv').config()
const connect_string = process.env.CONNECT_STRING

mongodb.connect(connect_string,{useNewUrlParser:true,useUnifiedTopology:true},function(err,client){
    module.exports = client.db()
    const app = require('./app')
    app.listen(process.env.PORT, () => console.log(`Example app listening on port`))
})