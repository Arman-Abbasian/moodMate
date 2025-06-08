import { useGetَAllMoodsQuery } from '@/services/MoodApi'
import { View } from 'react-native'
import AllMoodsChart from './components/AllMoodsChart'

export type AllMoodsQueryData = {
  date: string
  mood: string
  score: number
  createdAt: string
}

export default function Statistic() {
  //RTK
  const { data: AllMoodsQuery, isLoading: AllMoodsQueryLoading } =
    useGetَAllMoodsQuery({})
  console.log(AllMoodsQuery?.data)
  return (
    <View className="p-10">
      <AllMoodsChart
        chartData={(AllMoodsQuery?.data as AllMoodsQueryData[]) || []}
      />
    </View>
  )
}
