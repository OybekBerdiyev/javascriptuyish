const Io = require("./utils/io");
const Todos2 = new Io("./database/sell.json");

const testt = async() => {
    let = priceOf_sell = 0
    const sell = await Todos2.read()
    for (let i = 0; i < sell.length; i++) {
        priceOf_sell += sell[i]["price"]
    }
    console.log(priceOf_sell);
}

testt()