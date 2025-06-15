import { useGetَAllMoodsQuery, useLazyGetَMoodQuery } from '@/services/MoodApi'
import { View } from 'react-native'
import AllMoodsChart from './components/AllMoodsChart'
import { useEffect, useState } from 'react'
import { number } from 'zod'
import MoodChart from './components/MoodChart'
import { Mood } from '@/types/glabalTypes'

export type AllMoodsQueryData = {
  id: string
  date: string
  mood: string
  score: number
  createdAt: string
}

export default function Statistic() {
  //states
  const [moodId, setMoodId] = useState<null | string>(null)
  //RTK
  const { data: AllMoodsQuery, isLoading: AllMoodsQueryLoading } =
    useGetَAllMoodsQuery({})
  const [LazyGetَMood, { data: moodData, isLoading: LazyGetَMoodLoading }] =
    useLazyGetَMoodQuery()
  const dotClickHandler = (id: string) => {
    setMoodId(id)
  }
  console.log(moodData?.data)
  useEffect(() => {
    if (moodId) LazyGetَMood(moodId)
  }, [moodId])
  return (
    <View className="p-10">
      <AllMoodsChart
        chartData={(AllMoodsQuery?.data as AllMoodsQueryData[]) || []}
        onDotClickHandler={dotClickHandler}
      />
      {moodId && moodData?.data && (
        <View className="mt-16">
          <MoodChart data={moodData?.data?.moods as Mood[]} />
        </View>
      )}
    </View>
  )
}
