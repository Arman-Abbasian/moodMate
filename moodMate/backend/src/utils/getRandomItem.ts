export const getRandomItem = <T>(arr: T[]): T | null => {
  if (!arr || arr.length === 0) return null
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
