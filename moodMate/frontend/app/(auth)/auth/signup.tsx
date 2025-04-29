import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFInput from '@/ui/RHFInput'
import ActionButton from '@/ui/ActionButton'
import axios from 'axios'

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
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: SignupFormData) => {
    axios
      .post('http://localhost:5000/api/auth/signup', data)
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          console.log(res.data.message)
          router.replace('/auth/login' as never)
        } else {
          console.log(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // reset()
    // router.replace('/')
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6 gap-4">
      <Text className="text-white text-center font-bold text-2xl">sign up</Text>

      {/* First Name */}
      <RHFInput
        control={control}
        name="firstName"
        placeholder="first name"
        errors={errors}
        keyboardType="default"
      />
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
      <ActionButton onPress={handleSubmit(onSubmit)} text="sign up" />

      <Text onPress={() => router.push('/auth/login' as never)}>
        have an account? login
      </Text>
    </View>
  )
}
