import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'

interface RHFInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  placeholder: string
  keyboardType: KeyboardTypeOptions
  errors: FieldErrors<T>
}

const RHFInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  keyboardType,
  errors,
}: RHFInputProps<T>) => {
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="gray"
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            autoCapitalize="none"
            className="w-full rounded-xl px-3 py-4 mb-1 bg-white focus:border-none hover:border-none"
          />
        )}
      />
      {errors[name] && (
        <Text className="text-red-700">{errors[name]?.message as string}</Text>
      )}
    </View>
  )
}

export default RHFInput
