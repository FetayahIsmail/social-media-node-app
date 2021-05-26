const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./router');
const port = 3000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views','view')
app.set('view engine','ejs')
app.use('/',router)
module.exports = app
