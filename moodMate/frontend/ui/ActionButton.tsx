import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ActionButtonProps {
  onPress: () => void
  text: string
  className?: string
}

const ActionButton = (props: ActionButtonProps) => {
  const { onPress, text, className } = props
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl py-3 w-full mb-3 ${className}`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-bold">{text}</Text>
    </TouchableOpacity>
  )
}

export default ActionButton
