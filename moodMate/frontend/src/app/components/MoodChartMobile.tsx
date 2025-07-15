import React from 'react'
import { View, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { colors } from '@/constants/color'
import { Mood } from '@/types/glabalTypes'

type Props = {
  data: Mood[]
}

const screenWidth = Dimensions.get('window').width

export default function MoodChart({ data }: Props) {
  // تبدیل داده‌ها به فرمت مورد نیاز react-native-chart-kit
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.score),
      },
    ],
  }

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.primary,
    barPercentage: 0.6,
    fillShadowGradient: colors.primary,
    fillShadowGradientOpacity: 1,
  }

  return (
    <View style={{ width: '100%', height: 208, alignItems: 'center' }}>
      <BarChart
        data={chartData}
        width={screenWidth - 32} // عرض صفحه منهای padding
        height={208}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showValuesOnTopOfBars={true}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
        showBarTops={false}
        withInnerLines={false}
        flatColor={true}
        withHorizontalLabels={false}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  )
}
