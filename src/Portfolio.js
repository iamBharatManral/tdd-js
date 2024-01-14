const Money = require('./Money')
class Portfolio{
    constructor() {
        this.moneys = []
        this.exchangeRates = {
            "EUR->USD": 1.2,
            "USD->KRW": 1100
        }
    }
    add(...moneys){
        this.moneys = this.moneys.concat(...moneys)
    }
    convert(money, currency){
        if(money.currency === currency) return money.amount
        const exchangeRate = this.exchangeRates[money.currency + "->" + currency]
        return money.amount * exchangeRate
    }
    evaluate(currency){
        return new Money(this.moneys.reduce((sum, money) => sum + this.convert(money, currency), 0), currency)
    }
}

module.exports = Portfolio