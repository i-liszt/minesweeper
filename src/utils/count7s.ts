export const count7sByRegex = (end: number) => {
  let count: number = 0

  for (let i = 1; i <= end; i++) {
    count += /7/g.test(String(i)) ? 1 : 0
  }

  return count
}

export const count7s = (end: number): number => {
  if (!end || end < 7) {
    return 0
  }

  const digits: number = Math.floor(Math.log10(end))
  const resultsOf10e = new Array(digits + 1)
  resultsOf10e[0] = 0
  resultsOf10e[1] = 1

  for (let i = 2; i <= digits; i++) {
    resultsOf10e[i] = resultsOf10e[i - 1] * 9 + (10 ** (i - 1))
  }

  const pow = 10 ** digits
  if (end === pow) {
    return resultsOf10e[digits]
  }

  const mostSignificantDigit = Math.floor(end / pow)
  if (mostSignificantDigit > 7) {
    return (mostSignificantDigit - 1) * resultsOf10e[digits] + pow + count7s(end % pow)
  } if (mostSignificantDigit === 7) {
    // +1 is for (mostSignificantDigit * pow), e.g., 70.
    return mostSignificantDigit * resultsOf10e[digits] + (end % pow) + 1
  }

  return mostSignificantDigit * resultsOf10e[digits] + count7s(end % pow)
}
