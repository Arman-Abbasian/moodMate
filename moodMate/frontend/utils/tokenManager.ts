let accessToken: string | null = null

export const saveAccessToken = (token: string | null) => {
  accessToken = token
}

export const getAccessToken = () => accessToken
