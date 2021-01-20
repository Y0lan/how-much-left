const express = require('express');
const app = express()
const getPrice = require('../api/price');
const percent_diff = require('percentage-difference');

const getFormattedData= async (invest) => {
    const price = await getPrice();
    const actualValue = price * invest
    const percent = Math.round(percent_diff(invest, actualValue))
    const amount = `${Math.round(price * invest)}€`
    return {amount, percent}
}

app.post('/', async (req, res) => {
    const data = await getFormattedData(Number(req.body.invested))
    data.color = '#DDDDDD'
    if(data.percent > 2) data.color = '#01FF70'
    if(data.percent < 0) data.color = '#FF4136'
    if(isNaN(data.percent)) data.percent = ''
    else data.percent = data.percent + '%'
    if(data.amount === '0€') data.amount = ''
    res.render('index', {
        amount: data.amount,
        percent: data.percent,
        color: data.color
    })
})

module.exports = app
