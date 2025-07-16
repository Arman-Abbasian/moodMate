import React from 'react'
import { Dimensions, View, Text, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { colors } from '@/constants/color'
import { AllMoodsQueryData } from '../(protected)/statistic'

const screenWidth = Dimensions.get('window').width

type Props = {
  chartData: AllMoodsQueryData[]
  onDotClickHandler: (id: string) => void
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
}: Props) {
  const safeChartData = chartData.filter(
    (item) => typeof item.score === 'number' && isFinite(item.score)
  )

  if (safeChartData.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>
          هیچ داده معتبری برای نمایش وجود ندارد
        </Text>
      </View>
    )
  }

  // تبدیل تاریخ به فرمت چند خطی (روز، ماه، سال)
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString
      }

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      // استفاده از کاراکتر جدید خط برای نمایش ستونی
      return `${day}
${month}
${year}`
    } catch (error) {
      console.error('Error formatting date:', dateString, error)
      return dateString
    }
  }

  const safeLabels = safeChartData.map((item, index) => {
    try {
      if (!item.date) return `${index + 1}`

      const date = new Date(item.date)
      if (isNaN(date.getTime())) {
        return `${index + 1}`
      }

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      // برگرداندن آرایه‌ای از خطوط برای نمایش ستونی
      return [day, month, year].join('\n')
    } catch (error) {
      console.error('Error processing date:', item.date, error)
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
        withDots: true, // برگرداندن نقطه‌ها
      },
    ],
  }

  const chartWidth = Math.max(screenWidth - 40, safeChartData.length * 60)

  return (
    <View
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        marginHorizontal: 20,
        overflow: 'hidden',
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ borderRadius: 12 }}
      >
        <View style={{ position: 'relative', backgroundColor: '#1a1a1a' }}>
          <LineChart
            data={data}
            width={chartWidth}
            height={240}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#1a1a1a',
              backgroundGradientFrom: '#1a1a1a',
              backgroundGradientTo: '#1a1a1a',
              color: () => colors.primary,
              labelColor: () => colors.primary,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#fff',
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
              marginVertical: 8,
              marginLeft: 10,
              borderRadius: 0,
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

          {/* استیکرها بالای نقطه‌های نمودار */}
          {safeChartData.map((item, index) => {
            const emoji = moodEmojis[item.mood] || '❓'
            const leftPosition =
              70 +
              (chartWidth - 130) *
                (index / Math.max(safeChartData.length - 1, 1))

            // محاسبه موقعیت Y بر اساس مقدار score
            const maxScore = Math.max(...safeChartData.map((d) => d.score))
            const minScore = Math.min(...safeChartData.map((d) => d.score))
            const scoreRange = maxScore - minScore || 1
            const normalizedScore = (item.score - minScore) / scoreRange
            const topPosition = 180 - normalizedScore * 100 - 25 // 25 پیکسل بالاتر از نقطه

            return (
              <View
                key={`${item.id}-${index}`}
                style={{
                  position: 'absolute',
                  left: leftPosition - 12,
                  top: topPosition - 12,
                  width: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 18 }}>{emoji}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
