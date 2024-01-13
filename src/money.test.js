const Money = require('./Money')
const Portfolio = require('./Portfolio')

test('5 dollars * 2 = 10 dollars', () => {
    const fiveDollars = new Money(5, 'USD')
    const tenDollars = new Money(10, 'USD')
    expect(fiveDollars.times(2)).toStrictEqual(tenDollars)
});

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
    expect(portfolio.evaluate('USD')).toStrictEqual(fifteenDollars)
})