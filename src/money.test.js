const Dollar = require('./Dollar')
test('5 dollars * 2 = 10 dollars', () => {
    let fiver = new Dollar(5)
    let tenner = fiver.times(2)
    expect(tenner.amount).toBe(10)
});