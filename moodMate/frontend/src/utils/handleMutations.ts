// utils/handleMutation.ts

import Toast from 'react-native-toast-message'

type HandleMutationParams<T = any> = {
  mutationFn: () => Promise<T> // فانکشنی که خودش unwrap() شده mutation رو اجرا می‌کنه
  onSuccess?: (res: T) => void // اگر موفق بود، چه کن
  successMessage?: string // پیام موفقیت برای Toast
  defaultErrorMessage?: string // پیام پیش‌فرض خطا
}

export const handleMutation = async <T = any>({
  mutationFn,
  onSuccess,
  successMessage = 'Done successfully',
  defaultErrorMessage = 'Something went wrong',
}: HandleMutationParams<T>) => {
  try {
    const result = await mutationFn() // unwrap promise
    if (successMessage) {
      Toast.show({
        type: 'success',
        text1: successMessage,
      })
    }
    if (onSuccess) {
      onSuccess(result)
    }
  } catch (err: any) {
    console.log('Full error object:', JSON.stringify(err, null, 2))
    console.log('Error status:', err?.status)
    console.log('Error data:', err?.data)
    console.log('Error message:', err?.message)

    // چک کردن ساختارهای مختلف ارور
    let message = defaultErrorMessage

    if (err?.data?.message) {
      message = err.data.message
    } else if (err?.message) {
      message = err.message
    } else if (err?.status) {
      message = `Error ${err.status}: ${err.statusText || 'Unknown error'}`
    }
    Toast.show({
      type: 'error',
      text1: message,
    })
  }
}
