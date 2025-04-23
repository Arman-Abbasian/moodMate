import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter()

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6">
      <Text className="text-2xl font-bold mb-4">login</Text>

      <TextInput
        placeholder="email"
        className="w-full  rounded-xl px-3 py-4 mb-4 bg-white"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        className="w-full rounded-xl px-3 py-4 mb-6 bg-white"
      />

      <TouchableOpacity className="bg-secondary rounded-xl py-3 w-full mb-3">
        <Text className="text-white text-center font-bold">login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/Signup' as never)}>
        <Text className="text-gray-500">don't have an account? sign up</Text>
      </TouchableOpacity>
    </View>
  )
}
