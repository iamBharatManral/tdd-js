const Money = require('./Money')
class Portfolio{
    constructor() {
        this.moneys = []
    }
    add(...moneys){
        this.moneys = this.moneys.concat(...moneys)
    }
    convert(money, currency){
        const euroToUSD = 1.2
        if(money.currency === currency) return money.amount
        return money.amount * euroToUSD
    }
    evaluate(currency){
        return new Money(this.moneys.reduce((sum, money) => sum + this.convert(money, currency), 0), currency)
    }
}

module.exports = Portfolio