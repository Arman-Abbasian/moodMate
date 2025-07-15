import React, { useEffect, useState } from 'react'
import { View, Button, Pressable, Text } from 'react-native'
import { Audio } from 'expo-av'
import { colors } from '@/constants/color'

type Props = {
  uri: string
}

const MusicPlayerNative: React.FC<Props> = ({ uri }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const togglePlay = async () => {
    if (sound === null) {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri })
      setSound(newSound)
      await newSound.playAsync()
      setIsPlaying(true)
    } else {
      const status = await sound.getStatusAsync()
      if (status.isLoaded && status.isPlaying) {
        await sound.pauseAsync()
        setIsPlaying(false)
      } else {
        await sound.playAsync()
        setIsPlaying(true)
      }
    }
  }

  return (
    <View>
      <Pressable
        className="bg-primary px-4 py-3 rounded-md"
        onPress={togglePlay}
      >
        <Text className="text-white text-center">
          {isPlaying ? 'Pause' : 'Play'}
        </Text>{' '}
      </Pressable>
    </View>
  )
}

export default MusicPlayerNative
