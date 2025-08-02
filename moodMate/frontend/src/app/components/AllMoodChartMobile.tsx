import {
  Dimensions,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { colors } from '@/constants/color'
import { AllMoodsQueryData } from '../(protected)/statistic'

const screenWidth = Dimensions.get('window').width

type Props = {
  chartData: AllMoodsQueryData[]
  onDotClickHandler: (id: string) => void
  loading: boolean
}

const moodEmojis: Record<string, string> = {
  joy: '😊',
  sadness: '😢',
  fear: '😨',
  anger: '😡',
  surprise: '😲',
  love: '❤️',
  disgust: '🤢',
}

export default function AllMoodsChartMobile({
  chartData,
  onDotClickHandler,
  loading,
}: Props) {
  const safeChartData = chartData.filter(
    (item) => typeof item.score === 'number' && isFinite(item.score)
  )

  if (safeChartData.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>there is no data to show</Text>
      </View>
    )
  }

  //that is for the date horizontal axis labels
  const safeLabels = safeChartData.map((item, index) => {
    try {
      if (!item.createdAt) return `${index + 1}`

      const date = new Date(item.createdAt)
      if (isNaN(date.getTime())) {
        return `${index + 1}`
      }

      const year = date.getFullYear()
      const month = date.toLocaleDateString('en-US', { month: 'short' })
      const day = String(date.getDate()).padStart(2, '0')

      return [month, day, year].join('-')
    } catch (error) {
      console.error('Error processing date:', item.createdAt, error)
      return `${index + 1}`
    }
  })

  const data = {
    labels: safeLabels,
    datasets: [
      {
        data: safeChartData.map((item) => Number(item.score)),
        color: () => colors.primary,
        strokeWidth: 2,
        withDots: true,
      },
    ],
  }
  //that is for the distance between the dots
  const chartWidth = Math.max(screenWidth, safeChartData.length * 110)

  return (
    <View
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ borderRadius: 12 }}
          className="w-full"
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
        >
          <LineChart
            data={data}
            width={chartWidth}
            height={240}
            yLabelsOffset={50}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#1a1a1a',
              backgroundGradientFrom: '#1a1a1a',
              backgroundGradientTo: '#1a1a1a',

              color: () => colors.primary,
              labelColor: () => colors.primary,
              propsForDots: {
                r: '14',
                strokeWidth: '4',
                stroke: colors.secondary,
              },
              decimalPlaces: 0,

              propsForBackgroundLines: {
                strokeWidth: 0,
              },
              fillShadowGradient: 'transparent',
              fillShadowGradientOpacity: 0,
              propsForLabels: {
                fontSize: 10,
                textAnchor: 'middle',
              },
              propsForHorizontalLabels: {
                fill: colors.primary,
              },
              propsForVerticalLabels: {
                fill: colors.primary,
              },
            }}
            style={{
              marginVertical: 10,
              marginLeft: 0,
              borderRadius: 0,
              paddingLeft: 0,
            }}
            withShadow={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            onDataPointClick={({ index }) => {
              try {
                const item = safeChartData[index]
                if (item?.id) {
                  onDotClickHandler(item.id)
                }
              } catch (error) {
                console.error('Error in onDataPointClick:', error)
              }
            }}
          />
        </ScrollView>
      )}
    </View>
  )
}
