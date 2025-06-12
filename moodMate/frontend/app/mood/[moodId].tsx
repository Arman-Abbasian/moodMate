import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

const moodId = () => {
  const { moodId } = useLocalSearchParams()

  return <View>{moodId}</View>
}
export default moodId
