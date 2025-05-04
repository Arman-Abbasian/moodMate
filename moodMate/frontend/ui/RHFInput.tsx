import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form'

interface RHFInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'name'> {
  control: Control<T>
  name: Path<T>
  errors: FieldErrors<T>
}

const RHFInput = <T extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: RHFInputProps<T>) => {
  return (
    <View className="w-full">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            placeholderTextColor="gray"
            className="w-full rounded-xl px-3 py-4 mb-1 bg-white"
            {...rest}
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
