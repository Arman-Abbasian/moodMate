import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFInput from '@/ui/RHFInput'
import ActionButton from '@/ui/ActionButton'
import useCheckTokenExpiration from '@/hooks/useCheckTokenExpiration'
import { useSignupMutation } from '@/services/AuthApi'

//form schema
export const signupSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(30, { message: 'First name must be less than 30 characters' }),

  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must be less than 30 characters' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
})

export type SignupFormData = z.infer<typeof signupSchema>

export default function Signup() {
  //hooks
  const router = useRouter()

  useCheckTokenExpiration()

  const [Signup, { isLoading: SignupLoading }] = useSignupMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  //functions
  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await Signup(data)
      if (res?.data?.isSuccess) {
        router.navigate('/auth/login')
      } else {
        console.log('Signup failed:', res.data.message)
      }
    } catch (err) {
      console.log('Signup failed:', err)
    }
  }

  return (
    <View className="flex-1 justify-center items-center px-6 gap-4">
      <Text className="text-primary text-center font-bold text-2xl">
        sign up
      </Text>

      {/* First Name */}
      <RHFInput
        control={control}
        name="firstName"
        placeholder="first name"
        errors={errors}
        keyboardType="default"
        editable={SignupLoading}
      />
      {/* Email */}
      <RHFInput
        control={control}
        name="email"
        placeholder="email"
        errors={errors}
        keyboardType="email-address"
        editable={SignupLoading}
      />

      {/* Password */}
      <RHFInput
        control={control}
        name="password"
        placeholder="password"
        errors={errors}
        keyboardType="visible-password"
        editable={SignupLoading}
      />

      {/* Submit */}
      <ActionButton
        onPress={handleSubmit(onSubmit)}
        text="sign up"
        loading={SignupLoading}
      />

      <Text
        className="text-primary"
        onPress={() => router.navigate('/auth/login' as never)}
      >
        have an account? login
      </Text>
    </View>
  )
}
