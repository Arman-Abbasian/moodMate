const BASE_URL = 'http://192.168.115.98:5000'

export const getAbsoluteUrl = (relativePath: string) => {
  return `${BASE_URL}${relativePath}`
}
