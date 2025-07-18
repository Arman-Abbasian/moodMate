import { View, Dimensions, ActivityIndicator } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { colors } from '@/constants/color'
import { Mood } from '@/types/glabalTypes'

type Props = {
  data: Mood[]
  loading: Boolean
}

const screenWidth = Dimensions.get('window').width

export default function MoodChart({ data, loading }: Props) {
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
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.primary,
    fillShadowGradient: colors.primary,
    fillShadowGradientOpacity: 1,
  }

  return (
    <View
      style={{
        width: '100%',
        height: 238,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={238}
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
            marginLeft: -50,
          }}
        />
      )}
    </View>
  )
}
