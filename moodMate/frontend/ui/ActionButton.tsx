import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

interface ActionButtonProps {
  onPress: () => void
  text: string
  className?: string
  loading?: boolean
}

const ActionButton = ({
  onPress,
  text,
  className = '',
  loading = false,
}: ActionButtonProps) => {
  const isDisabled = loading || false

  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl py-3 w-full mb-3 items-center ${
        isDisabled && 'opacity-50'
      }
        ${className}`}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator className="text-primary" />
      ) : (
        <Text className="text-white text-center font-bold">{text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default ActionButton
