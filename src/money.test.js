const Money = require('./Money')
const Portfolio = require('./Portfolio')
const Bank = require('./Bank')
describe('Money Tests', () => {
    let bank;
    beforeEach(() => {
        bank = new Bank()
        bank.addExchangeRate("EUR", "USD", 1.2)
        bank.addExchangeRate("USD", "KRW", 1100)
    })
    test('10 euros * 2 = 20 euros', () => {
        const tenEuros = new Money(10, 'EUR')
        const twentyEuros = new Money(20, 'EUR')
        expect(tenEuros.times(2)).toStrictEqual(twentyEuros)
    });

    test('4002 KRW / 4 equals 1000.5 KRW', () => {
        const originalMoney = new Money(4002, 'KRW')
        const newMoney = originalMoney.divide(4)
        const expectedMoney = new Money(1000.5, 'KRW')
        expect(newMoney).toStrictEqual(expectedMoney)
    })

    test('test addition', () => {
        const portfolio = new Portfolio()
        const fiveDollars = new Money(5, 'USD')
        const tenDollars = new Money(10, 'USD')
        const fifteenDollars = new Money(15, 'USD')
        portfolio.add(fiveDollars)
        portfolio.add(tenDollars)
        const bank = new Bank()
        expect(portfolio.evaluate(bank, 'USD')).toStrictEqual(fifteenDollars)
    })

    test('addition of dollars and euros', () => {
        const fiveDollars = new Money(5, 'USD')
        const tenEuros = new Money(10, 'EUR')

        const portfolio = new Portfolio()
        portfolio.add(fiveDollars)
        portfolio.add(tenEuros)

        const expectedValue = new Money(17, 'USD')
        const actualValue = portfolio.evaluate(bank,'USD')
        expect(expectedValue).toStrictEqual(actualValue)
    })

    test('addition of dollars and wons', () => {
        const oneDollar = new Money(1, "USD")
        const elevenHundredWon = new Money(1100, "KRW")

        const portfolio = new Portfolio()
        portfolio.add(oneDollar)
        portfolio.add(elevenHundredWon)

        const expectedValue = new Money(2200, 'KRW')
        const actualValue = portfolio.evaluate(bank, 'KRW')

        expect(expectedValue).toStrictEqual(actualValue)
    })

    test('addition with multiple missing exchange rates', () => {
        const oneDollar = new Money(1, 'USD')
        const oneEuro = new Money(1, 'EUR')
        const oneWon = new Money(1, 'KRW')

        const portfolio = new Portfolio()
        portfolio.add(oneDollar)
        portfolio.add(oneEuro)
        portfolio.add(oneWon)

        const expectedErrorMessage = new Error('Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid,]')
        expect(portfolio.evaluate(bank,'Kalganid')).toStrictEqual(expectedErrorMessage)
    })

    test('conversion', () => {
        let tenEuros = new Money(10, 'EUR')
        let actualConvertedMoney = bank.convert(tenEuros, 'USD')
        expect(new Money(12, 'USD')).toStrictEqual(actualConvertedMoney)

        bank.addExchangeRate('EUR', 'USD', 1.3)
        actualConvertedMoney = bank.convert(tenEuros, 'USD')
        expect(new Money(13, 'USD')).toStrictEqual(actualConvertedMoney)

    })

    test('conversion with missing exchange rate', () => {
        const tenEuros = new Money(10, 'EUR')
        const expectedErrorMessage = new Error("EUR->Kalganid")
        const actualErrorMessage = bank.convert(tenEuros, 'Kalganid')
        expect(actualErrorMessage).toStrictEqual(expectedErrorMessage)
    })

    test('what is the conversion rate from euro to usd', () => {
        const tenEuros = new Money(10, 'EUR')
        actualConvertedMoney = bank.convert(tenEuros, 'USD')
        expect(new Money(12, 'USD')).toStrictEqual(actualConvertedMoney)
    })
})







