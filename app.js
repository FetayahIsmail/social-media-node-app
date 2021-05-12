const express = require('express')
const app = express()
const router = require('./router');
const port = 3000
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.set('views','view')
app.set('view engine','ejs')
app.use('/',router)
app.listen(port, () => console.log(`Example app listening on port port!`))