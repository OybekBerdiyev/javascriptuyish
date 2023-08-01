class Order {
    constructor(userId,productId, price, count, address, profit){
        this.userId = userId
        this.productId = productId
        this.address = address
        this.price = price
        this.count = count
        this.profit = profit
    }
}

module.exports = Order

