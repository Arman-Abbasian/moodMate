export const moodResources: Record<
  string,
  {
    images: string[]
    music: string[]
    quotes: string[]
  }
> = {
  joy: {
    images: ['/static/image/joy/joy1.png'],
    music: ['/static/music/joy/joy1.mp3'],
    quotes: ['Keep smiling, because life is a beautiful thing!'],
  },
  sadness: {
    images: ['/static/image/sadness/sadness1.png'],
    music: ['/static/music/sadness/sadness1.mp3'],
    quotes: ['Even the darkest night will end and the sun will rise.'],
  },
  anger: {
    images: ['/static/image/anger/anger1.png'],
    music: ['/static/music/anger/anger1.mp3'],
    quotes: [
      'For every minute you remain angry, you give up sixty seconds of peace of mind.',
    ],
  },
  fear: {
    images: ['/static/image/fear/fear1.png'],
    music: ['/static/music/fear/fear1.mp3'],
    quotes: ['Fear is only as deep as the mind allows'],
  },
  love: {
    images: ['/static/image/love/love1.png'],
    music: ['/static/music/love/love1.mp3'],
    quotes: [
      'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.',
    ],
  },
  surprise: {
    images: ['/static/image/surprise/surprise1.png'],
    music: ['/static/music/surprise/surprise1.mp3'],
    quotes: ['The moments of surprise are what make life magical.'],
  },
}
