const express = require('express');
const app = express()
const getPrice = require('../api/price');
const percent_diff = require('percentage-difference');

const getFormattedData = async (invest) => {
    const price = await getPrice();
    const actualValue = price * invest
    const percent = Math.round(percent_diff(invest, actualValue))
    const amount = Math.round(price * invest)
    return {amount, percent}
}

app.post('/', async (req, res) => {
    const invested = Number(req.body.invested)
    if (invested <= 0 || isNaN(invested)) {
        return res.render('index', {
            color: '#AAAAAA',
            amount: '',
            percent: ''
        });
    }
    let {amount, percent} = await getFormattedData(Number(invested))
    let color = '#DDDDDD'
    let prefixPercent = 'Gain de '
    let prefixDifference = 'Gain de '
    if (isNaN(percent)) percent = ''
    else if (percent > 2) color = '#01FF70'
    else if (percent < 0) {
        prefixPercent = 'Perte de '
        prefixDifference = 'Perte de '
        color = '#FF4136'
    }

    const difference = Math.abs(invested - amount)

    res.render('index', {
        color,
        amount: amount + '€' + ' pour ' + invested + '€',
        percent: prefixPercent + percent + '%',
        difference: prefixDifference + difference + '€'
    });
})

module.exports = app
