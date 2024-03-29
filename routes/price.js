const express = require('express');
const app = express()
const getPrice = require('../api/price');
const percent_diff = require('percentage-difference');

const getFormattedData = async (invest) => {
    const price = await getPrice();
    const actualValue =  invest + (invest / Math.random() * (1.5 - 1.1) + 1.1);
    const percent = Math.round(percent_diff(invest, actualValue))
    const amount = Math.round(actualValue)
    return {amount, percent}
}

app.post('/', async (req, res) => {
    const invested = Number(req.body.invested)
    let color = '#DDDDDD'
    if (invested <= 0 || isNaN(invested)) {
        return res.render('index', {
            color,
            amount: '',
            percent: '',
            diff: ''
        });
    }
    let {amount, percent} = await getFormattedData(Number(invested))
    let prefixPercent = 'Gain de '
    let prefixDifference = 'Gain de '
    if (isNaN(percent)) percent = ''
    else if (percent > 2) color = '#3D9970'
    else if (percent < 0) {
        prefixPercent = 'Perte de '
        prefixDifference = 'Perte de '
        color = '#FF4136'
    }

    const difference = Math.abs(invested - amount)

    res.render('index', {
        color,
        amount: "/",
        percent: "/",
        diff: "/"
    });
})

module.exports = app
