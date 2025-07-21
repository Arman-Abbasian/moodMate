import { View, ScrollView, ViewProps, ScrollViewProps } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode
  scrollProps?: ScrollViewProps
}

const ScreenWrapper = ({
  children,
  scrollProps,
  ...rest
}: ScreenWrapperProps) => {
  const inset = useSafeAreaInsets()
  return (
    <View
      className="flex-1 items-center bg-background px-6"
      {...rest}
      style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}
    >
      <ScrollView
        className="mt-4 w-full flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollProps}
      >
        {children}
      </ScrollView>
    </View>
  )
}

export default ScreenWrapper
