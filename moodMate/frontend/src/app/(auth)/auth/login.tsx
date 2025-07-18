import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFInput from '@/ui/RHFInput'
import ActionButton from '@/ui/ActionButton'
import { storage } from '@/utils/storage'
import { useLoginMutation } from '@/services/AuthApi'
import useCheckTokenExpiration from '@/hooks/useCheckTokenExpiration'
import { useAuth } from '@/context/AuthContext'
import Toast from 'react-native-toast-message'
import { handleMutation } from '@/utils/handleMutations'

//form schema
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
  //hooks
  const router = useRouter()
  const { setIsAuthenticated } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useCheckTokenExpiration()

  //RTK
  const [Login, { isLoading: LoginLoading }] = useLoginMutation()

  //functions
  const onSubmit = (data: LoginFormData) => {
    handleMutation({
      mutationFn: () => Login(data).unwrap(),
      successMessage: 'Logged in successfully',
      onSuccess: async (res) => {
        const { accessToken, refreshToken } = res.data
        await storage.setItem('accessToken', accessToken)
        await storage.setItem('refreshToken', refreshToken)
        setIsAuthenticated(true)
        router.navigate('/')
      },
      toastPosition: 'bottom',
    })
  }

  return (
    <View className="px-6 gap-4 flex-1 justify-center items-center">
      <Text className="text-primary text-center font-bold text-2xl">login</Text>
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

      <Text
        className="text-primary"
        onPress={() => router.push('/auth/signup' as never)}
      >
        don't have an account? sign up
      </Text>
    </View>
  )
}
