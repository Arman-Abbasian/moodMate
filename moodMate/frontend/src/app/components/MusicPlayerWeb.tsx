import { colors } from '@/constants/color'
import React, { useRef, useState } from 'react'
import { View, Pressable } from 'react-native'

type Props = {
  uri: string
}

const MusicPlayerWeb: React.FC<Props> = ({ uri }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <View>
      <audio ref={audioRef} src={uri} controls style={{ display: 'none' }} />
      <Pressable
        className={`${colors.primary} w-full h-10 rounded-md flex items-center justify-center`}
        onPress={togglePlay}
      >
        <span style={{ color: 'white', fontWeight: 'bold' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </span>
      </Pressable>
    </View>
  )
}

export default MusicPlayerWeb
