import RHFInput from '@/ui/RHFInput'
import { useForm } from 'react-hook-form'
import { ScrollView, View, Text, Image, Platform } from 'react-native'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ActionButton from '@/ui/ActionButton'
import { useAddMoodMutation } from '@/services/MoodApi'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import MoodChart from './components/MoodChart'
import { Mood } from '@/types/glabalTypes'
import MusicPlayer from './components/MusicPlayerWeb'
import { getAbsoluteUrl } from '@/utils/getAbsoluteUrl'
import MusicPlayerWeb from './components/MusicPlayerWeb'
import MusicPlayerNative from './components/MusicPlayerNative'

export const moodSchema = z.object({
  mood: z
    .string({ required_error: 'please enter your mood' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(500, { message: 'Password must be less than 500 characters' }),
})

export type MoodFormData = z.infer<typeof moodSchema>
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
  const [data, setData] = useState<AddMoodType | null>(null)
  const [AddMood, { isLoading: AddMoodLoading }] = useAddMoodMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoodFormData>({
    resolver: zodResolver(moodSchema),
  })

  const onSubmit = async (value: MoodFormData) => {
    const res = await AddMood(value).unwrap()
    setData(res)
  }
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)
  if (isAuthenticated === null) return null // یا یک spinner نمایش بده

  if (!isAuthenticated) return <Redirect href="/auth/login" />

  return (
    <View className="flex-1 items-center bg-primary px-6">
      <ScrollView className="mt-4 w-full flex-1">
        <View className="gap-4">
          <RHFInput
            control={control}
            name="mood"
            placeholder="how do you feel today"
            errors={errors}
            keyboardType="default"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          {/* Submit */}
          <ActionButton
            onPress={handleSubmit(onSubmit)}
            text="send"
            loading={AddMoodLoading}
          />
        </View>
        {data && (
          <View className="flex gap-5">
            <Text className="text-2xl">Main Feel: {data.topMood.label}</Text>
            <View>
              <MoodChart data={data.moods} />
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
      </ScrollView>
    </View>
  )
}
