const express = require('express');
const priceRoute = require('./routes/price')
const bodyParser = require('body-parser')
const path = require("path");
const app = express()
const port = 3000
process.env.PORT = port
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
        percent:''
    })
})
app.listen(port, () => {
    console.log("app listening")
})
