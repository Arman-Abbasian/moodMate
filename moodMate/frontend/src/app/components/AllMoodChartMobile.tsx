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
  // پاک‌سازی و دیباگ دیتا
  console.log('Original chartData:', chartData)

  const safeChartData = chartData.filter(
    (item) => typeof item.score === 'number' && isFinite(item.score)
  )

  console.log('Safe chartData:', safeChartData)

  if (safeChartData.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text>هیچ داده معتبری برای نمایش وجود ندارد</Text>
      </View>
    )
  }

  // تبدیل labels به فرمت امن
  const safeLabels = safeChartData.map((item, index) => {
    try {
      if (!item.date) return `${index + 1}`

      // تبدیل به string و پاک کردن کاراکترهای مشکل‌ساز
      const dateString = String(item.date)
        .replace(/[^\w\s\-\/]/g, '') // فقط حروف، اعداد، فاصله، خط تیره، اسلش
        .trim()

      // اگر خیلی طولانی بود، کوتاهش کن
      if (dateString.length > 10) {
        const parts = dateString.split(' ')
        return parts[0] || `${index + 1}`
      }

      return dateString || `${index + 1}`
    } catch (error) {
      console.error('Error processing date:', item.date, error)
      return `${index + 1}`
    }
  })

  console.log('Safe labels:', safeLabels)

  const data = {
    labels: safeLabels,
    datasets: [
      {
        data: safeChartData.map((item) => Number(item.score)),
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  }

  const chartWidth = Math.max(screenWidth - 40, safeChartData.length * 60)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ paddingVertical: 10 }}>
        <LineChart
          data={data}
          width={chartWidth}
          height={300}
          fromZero
          withInnerLines={false}
          withOuterLines={false}
          withDots
          bezier
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => colors.primary,
            labelColor: () => colors.text,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#fff',
            },
            decimalPlaces: 0, // حذف اعشار
          }}
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
          decorator={() => {
            return safeChartData.map((item, index) => {
              const emoji = moodEmojis[item.mood] || '❓'
              const left = (chartWidth / safeChartData.length) * index

              return (
                <View
                  key={item.id || index}
                  style={{
                    position: 'absolute',
                    left: left - 8,
                    top: 10,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{emoji}</Text>
                </View>
              )
            })
          }}
        />
      </View>
    </ScrollView>
  )
}
