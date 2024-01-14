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
        let total = 0
        const failedConversions = []
        for(const money of this.moneys){
            const convertedMoney = this.convert(money, currency)
            if(Number.isNaN(convertedMoney)){
                failedConversions.push(money.currency + "->" + currency)
                continue
            }
            total += convertedMoney
        }
        if(failedConversions.length ===0) return new Money(total, currency)
        let failures = "["
        for(const failure of failedConversions){
            failures += failure + ","
        }
        failures += "]"
        throw new Error('Missing exchange rate(s):' + failures)
    }
}

module.exports = Portfolio