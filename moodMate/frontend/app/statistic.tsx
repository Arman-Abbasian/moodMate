import { useGetَAllMoodsQuery } from '@/services/MoodApi'
import { View } from 'react-native'
import AllMoodsChart from './components/AllMoodsChart'

export default function Statistic() {
  //RTK
  const { data: AllMoodsQuery, isLoading: AllMoodsQueryLoading } =
    useGetَAllMoodsQuery({})
  console.log(AllMoodsQuery.data)
  return (
    <View>
      <AllMoodsChart
        chartData={AllMoodsQuery?.data}
        moods={AllMoodsQuery?.data}
      />
    </View>
  )
}
