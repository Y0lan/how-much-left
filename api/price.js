const axios = require("axios");
const BASE_URL = "https://api.nomics.com/v1/currencies/ticker"

const getPrice = async () => {
    try {
        const res = await axios.get(BASE_URL + `?key=${process.env.API_KEY}&ids=TRAC&convert=EUR`)
        if(res.status === 200) return res.data[0].price
    } catch (errors) {
        console.log(errors.message)
    }
}
module.exports = getPrice
