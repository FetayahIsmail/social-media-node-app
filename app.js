const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');
const app = express()
let sessionOption = session({
    secret:'cooool',
    store: new MongoStore({client:require('./db')}),
    resave:false ,
    saveUninitialized:false,
    cockie:{maxAge:1000*3600*24,httpOnly:true},
})
app.use(sessionOption)
app.use(flash())
const router = require('./router');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views','view')
app.set('view engine','ejs')
app.use('/',router)
module.exports = app
