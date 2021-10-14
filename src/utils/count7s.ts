export default (end: number) => {
  let count: number = 0

  for (let i = 1; i <= end; i++) {
    count += (String(i).match(/7/g) || []).length
  }

  return count
}
