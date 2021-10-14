import count7s from '~/utils/count7s'

describe('Count 7s', () => {
  test('should 7 occurs 1 time in the range 1~7', () => {
    expect(count7s(7)).toBe(1)
  })

  test('should 7 occurs 2 times in the range 1~20', () => {
    expect(count7s(20)).toBe(2)
  })

  test('should 7 occurs 8 times in the range 1~70', () => {
    expect(count7s(70)).toBe(8)
  })

  test('should 7 occurs 19 times in the range 1~100', () => {
    expect(count7s(100)).toBe(19)
  })

  test('should 7 occurs 300 times in the range 1~1000', () => {
    expect(count7s(1000)).toBe(300)
  })
})
