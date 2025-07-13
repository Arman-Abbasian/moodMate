let setAuthFn: (val: boolean) => void = () => {}

export const registerSetAuthFn = (fn: (val: boolean) => void) => {
  setAuthFn = fn
}

export const setAuthState = (val: boolean) => {
  setAuthFn(val)
}
