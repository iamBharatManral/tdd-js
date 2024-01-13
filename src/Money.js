class Money{
    constructor(amount, currency) {
        this.amount = amount
        this.currency = currency
    }
    times(multiplier){
        return new Money(this.amount * multiplier, this.currency)
    }
    divide(divider){
        return this.times(1/ divider)
    }
}

module.exports = Money