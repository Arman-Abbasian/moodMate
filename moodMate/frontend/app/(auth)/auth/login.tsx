import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFInput from '@/ui/RHFInput'
import ActionButton from '@/ui/ActionButton'
import { storage } from '@/utils/storage'
import { useLoginMutation } from '@/services/authApi'

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

export default function Login() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  //RTK
  const [Login, { isLoading: LoginLoading }] = useLoginMutation()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await Login(data)
      console.log(res)
      if (res?.data?.isSuccess) {
        const { accessToken, refreshToken } = res.data.data
        await storage.setItem('accessToken', accessToken)
        await storage.setItem('refreshToken', refreshToken)

        router.navigate('/')
      } else {
        console.log('Login failed:', res.error)
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
      <ActionButton
        onPress={handleSubmit(onSubmit)}
        text="login"
        loading={LoginLoading}
      />

      <Text onPress={() => router.push('/auth/signup' as never)}>
        don't have an account? sign up
      </Text>
    </View>
  )
}
