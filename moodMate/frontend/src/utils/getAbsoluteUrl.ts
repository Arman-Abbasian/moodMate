const Backend_BASE_URL = 'http://192.168.85.98:5000'

export const getAbsoluteUrl = (relativePath: string) => {
  return `${Backend_BASE_URL}${relativePath}`
}
