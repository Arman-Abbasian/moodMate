import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'

interface FormData {
  firstName: string
  email: string
  password: string
}
export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    password: '',
  })

  const changeFormDataHandler = (e: string, name: string) => {
    setFormData({ ...formData, [name]: e })
  }
  const handleSignup = () => {
    console.log(formData)
    setFormData({
      firstName: '',
      email: '',
      password: '',
    })
    router.replace('/')
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6">
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>sign up</Text>
      <TextInput
        placeholder="first name"
        value={formData.firstName}
        className="w-full rounded-xl px-3 py-4 mb-6 bg-white"
        onChangeText={(e: string) => changeFormDataHandler(e, 'firstName')}
      />
      <TextInput
        placeholder="email"
        value={formData.email}
        className="w-full rounded-xl px-3 py-4 mb-6 bg-white"
        onChangeText={(e: string) => changeFormDataHandler(e, 'email')}
      />
      <TextInput
        placeholder="password"
        value={formData.password}
        className="w-full rounded-xl px-3 py-4 mb-6 bg-white"
        onChangeText={(e: string) => changeFormDataHandler(e, 'password')}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-secondary rounded-xl py-3 w-full mb-3"
        onPress={handleSignup}
      >
        <Text className="text-white text-center font-bold">sign up</Text>
      </TouchableOpacity>
      <Text onPress={() => router.push('/auth/login' as never)}>
        have an account? login
      </Text>
    </View>
  )
}
