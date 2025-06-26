import React, { useRef, useState } from 'react'
import { View, Button } from 'react-native'

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
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay} />
    </View>
  )
}

export default MusicPlayerWeb
