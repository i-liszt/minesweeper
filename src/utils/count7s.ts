export const count7sByRegex = (end: number) => {
  let count: number = 0

  for (let i = 1; i <= end; i++) {
    count += (String(i).match(/7/g) || []).length
  }

  return count
}

export const count7s = (end: number) => {
  let count: number = 0

  for (let i = 1; i <= end; i++) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    String(i).split('').forEach((digit: string) => {
      if (digit === '7') {
        count++
      }
    })
  }
  return count
}

export default count7s
