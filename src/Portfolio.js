const Money = require('./Money')
class Portfolio{
    constructor() {
        this.moneys = []
    }
    add(...moneys){
        this.moneys = this.moneys.concat(...moneys)
    }
    evaluate(currency){
        return new Money(this.moneys.reduce((sum, money) => sum + money.amount, 0), currency)
    }
}

module.exports = Portfolio