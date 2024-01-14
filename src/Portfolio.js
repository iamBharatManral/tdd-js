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
    evaluate(bank, currency){
        let total = 0
        const failedConversions = []
        for(const money of this.moneys){
            const convertedMoney = bank.convert(money, currency)
            if(convertedMoney instanceof Error){
                failedConversions.push(convertedMoney.message)
                continue
            }
            total += convertedMoney.amount
        }
        if(failedConversions.length ===0) return new Money(total, currency)
        let failures = "["
        for(const failure of failedConversions){
            failures += failure + ","
        }
        failures += "]"
        return new Error('Missing exchange rate(s):' + failures)
    }
}

module.exports = Portfolio