const axios = require("axios");
const API_KEY = "a96b9eb44e8daaa7bf6ff04425e9c673" // TODO : put as env variable
const BASE_URL = "https://api.nomics.com/v1/currencies/ticker"

const getPrice = async () => {
    try {
        const res = await axios.get(BASE_URL + `?key=${API_KEY}&ids=TRAC`)
        if(res.status === 200) return res.data[0].price
    } catch (errors) {
        console.log(errors.message)
    }
}
module.exports = getPrice
