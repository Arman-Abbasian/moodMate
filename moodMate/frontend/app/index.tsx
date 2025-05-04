import RHFInput from '@/ui/RHFInput'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ActionButton from '@/ui/ActionButton'

export const moodSchema = z.object({
  mood: z
    .string({ required_error: 'please enter your mood' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(500, { message: 'Password must be less than 500 characters' }),
})

export type MoodFormData = z.infer<typeof moodSchema>
export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoodFormData>({
    resolver: zodResolver(moodSchema),
  })

  const onSubmit = (value: MoodFormData) => {
    console.log(value)
  }
  console.log(errors)
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
          <ActionButton onPress={handleSubmit(onSubmit)} text="send" />
        </View>
      </ScrollView>
    </View>
  )
}
