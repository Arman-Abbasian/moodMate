import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFInput from '@/ui/RHFInput'
import ActionButton from '@/ui/ActionButton'
import axios from 'axios'
import * as Keychain from 'react-native-keychain'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must be less than 30 characters' }),
})

export type LoginFormData = z.infer<typeof loginSchema>

export default function Signup() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data)

      if (res.status === 200) {
        const { accessToken, refreshToken } = res.data.data

        // ذخیره امن توکن‌ها
        await Keychain.setGenericPassword('accessToken', accessToken)
        await Keychain.setInternetCredentials(
          'refreshToken',
          'user',
          refreshToken
        )

        console.log('Login successful:', res.data.message)

        router.replace('/' as never)
      } else {
        console.log('Unexpected status:', res.status)
      }
    } catch (err) {
      console.log('Login failed:', err)
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6 gap-4">
      <Text className="text-white text-center font-bold text-2xl">login</Text>
      {/* Email */}
      <RHFInput
        control={control}
        name="email"
        placeholder="email"
        errors={errors}
        keyboardType="email-address"
      />

      {/* Password */}
      <RHFInput
        control={control}
        name="password"
        placeholder="password"
        errors={errors}
        keyboardType="visible-password"
      />

      {/* Submit */}
      <ActionButton onPress={handleSubmit(onSubmit)} text="login" />

      <Text onPress={() => router.push('/auth/signup' as never)}>
        don't have an account? sign up
      </Text>
    </View>
  )
}
