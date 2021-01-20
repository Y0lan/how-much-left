const express = require('express');
const priceRoute = require('./routes/price')
const bodyParser = require('body-parser')
const path = require("path");
const dotenv = require("dotenv")

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(priceRoute)
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        color: '#AAAAAA',
        amount:'',
        percent:'',
        diff: ''
    })
})
app.listen(port, () => {
    console.log(`app listening on ${port}`)
})
