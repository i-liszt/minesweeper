import { count7s } from '~/utils/count7s'

describe('Count 7s', () => {
  test('should 7 appears in 1 number of the range 1~7', () => {
    expect(count7s(7)).toBe(1)
  })

  test('should 7 appears in 2 numbers of the range 1~20', () => {
    expect(count7s(20)).toBe(2)
  })

  test('should 7 appears in 8 numbers of the range 1~70', () => {
    expect(count7s(70)).toBe(8)
  })

  test('should 7 appears in 19 numbers of the range 1~100', () => {
    expect(count7s(100)).toBe(19)
  })

  test('should 7 appears in 271 numbers of the range 1~1000', () => {
    expect(count7s(1000)).toBe(271)
  })
})
