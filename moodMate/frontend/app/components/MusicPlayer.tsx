import React, { useEffect, useState } from 'react'
import { Platform, View, Button, Text } from 'react-native'

// برای موبایل
import { Audio } from 'expo-av'

// برای وب
// می‌تونیم از یک تگ HTML ساده <audio> با ref استفاده کنیم

type Props = {
  uri: string
}

const MusicPlayer: React.FC<Props> = ({ uri }) => {
  // استیت مشترک برای وضعیت پخش
  const [isPlaying, setIsPlaying] = useState(false)

  if (Platform.OS === 'web') {
    // پلیر وب با تگ <audio>
    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    const togglePlay = () => {
      if (!audioRef.current) return
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }

    return (
      <View>
        <audio ref={audioRef} src={uri} />
        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay} />
      </View>
    )
  } else {
    // موبایل با expo-av
    const [sound, setSound] = useState<Audio.Sound | null>(null)

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
}

export default MusicPlayer
