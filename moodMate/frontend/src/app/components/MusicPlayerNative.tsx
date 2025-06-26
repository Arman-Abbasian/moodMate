import React, { useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import { Audio } from 'expo-av'

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
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay} />
    </View>
  )
}

export default MusicPlayerNative
