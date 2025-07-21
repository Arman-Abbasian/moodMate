import RHFInput from '@/ui/RHFInput'
import { useForm } from 'react-hook-form'
import { View, Text, Image, Platform } from 'react-native'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ActionButton from '@/ui/ActionButton'
import { useAddMoodMutation } from '@/services/MoodApi'
import { useState } from 'react'
import { getAbsoluteUrl } from '@/utils/getAbsoluteUrl'
import MusicPlayerWeb from '../components/MusicPlayerWeb'
import MusicPlayerNative from '../components/MusicPlayerNative'
import ScreenWrapper from '@/ui/ScreenWrapper'
import useCheckTokenExpiration from '@/hooks/useCheckTokenExpiration'
import MoodChartMobile from '../components/MoodChartMobile'

//form schema
export const moodSchema = z.object({
  mood: z
    .string({ required_error: 'please enter your mood' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(500, { message: 'Password must be less than 500 characters' }),
})

export type MoodFormData = z.infer<typeof moodSchema>

//types
type AddMoodType = {
  topMood: { label: string; score: number }
  moods: Array<{ label: string; score: number }>
  resources: {
    image: string
    music: string
    quote: string
  }
}

export default function Index() {
  //states
  const [data, setData] = useState<AddMoodType | null>(null)
  //RTK
  const [AddMood, { isLoading: AddMoodLoading }] = useAddMoodMutation()

  //hooks
  useCheckTokenExpiration()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoodFormData>({
    resolver: zodResolver(moodSchema),
  })

  //functions
  const onSubmit = async (value: MoodFormData) => {
    const res = await AddMood(value).unwrap()
    setData(res)
  }

  return (
    <ScreenWrapper>
      <View className="gap-4">
        <RHFInput
          control={control}
          name="mood"
          placeholder="how do you feel today"
          errors={errors}
          keyboardType="default"
          multiline
          textAlignVertical="top"
          editable={!AddMoodLoading}
          className="h-44"
        />
        {/* Submit */}
        <ActionButton
          onPress={handleSubmit(onSubmit)}
          text="send"
          loading={AddMoodLoading}
        />
      </View>
      {data && (
        <View className="flex gap-5 mt-10">
          <Text className="text-2xl">Main Feel: {data.topMood.label}</Text>
          <View>
            <MoodChartMobile data={data.moods} loading={AddMoodLoading} />
          </View>
          <Text>{data.resources.quote}</Text>
          <Image
            source={{ uri: getAbsoluteUrl(data.resources.image) }}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
          {Platform.OS === 'web' ? (
            <MusicPlayerWeb uri={getAbsoluteUrl(data.resources.music)} />
          ) : (
            <MusicPlayerNative uri={getAbsoluteUrl(data.resources.music)} />
          )}
        </View>
      )}
    </ScreenWrapper>
  )
}
