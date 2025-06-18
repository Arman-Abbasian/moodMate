import { View, ScrollView, ViewProps, ScrollViewProps } from 'react-native'
import React from 'react'

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode
  scrollProps?: ScrollViewProps
}

const ScreenWrapper = ({
  children,
  scrollProps,
  ...rest
}: ScreenWrapperProps) => {
  return (
    <View className="flex-1 items-center bg-primary px-6" {...rest}>
      <ScrollView className="mt-4 w-full flex-1" {...scrollProps}>
        {children}
      </ScrollView>
    </View>
  )
}

export default ScreenWrapper
