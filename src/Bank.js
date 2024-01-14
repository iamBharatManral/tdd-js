const Money = require("./Money");

class Bank{
    constructor() {
        this.exchangeRates = {}
    }
    addExchangeRate(sourceCurrency, targetCurrency, rate){
        const key = sourceCurrency + "->" + targetCurrency
        this.exchangeRates[key] = rate
    }
    convert(money, currency){
        if(money.currency === currency) return new Money(money.amount, currency)
        const key = money.currency + "->" + currency
        const exchangeRate = this.exchangeRates[key]
        if(!exchangeRate) {
            return new Error(key)
        }
        return new Money(money.amount * exchangeRate, currency)
    }
}

module.exports = Bank