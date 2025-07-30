export const moodResources: Record<
  string,
  {
    images: string[]
    music: string[]
    quotes: string[]
  }
> = {
  joy: {
    images: ['/static/image/joy/joy1.jpg', '/static/image/joy/joy2.jpg'],
    music: [
      '/static/music/joy/joy1.mp3',
      '/static/music/joy/joy2.mp3',
      '/static/music/joy/joy3.mp3',
    ],
    quotes: [
      '“Joy is not in things; it is in us.” — Richard Wagner',
      '“Let your joy be in your journey—not in some distant goal.” — Tim Cook',
      '“We are shaped by our thoughts; we become what we think. When the mind is pure, joy follows like a shadow that never leaves.” — Buddha',
    ],
  },
  sadness: {
    images: [
      '/static/image/sadness/sadness1.jpg',
      '/static/image/sadness/sadness2.jpg',
    ],
    music: [
      '/static/music/sadness/sadness1.mp3',
      '/static/music/sadness/sadness2.mp3',
      '/static/music/sadness/sadness3.mp3',
      '/static/music/sadness/sadness4.mp3',
    ],
    quotes: [
      '“The word ‘happy’ would lose its meaning if it were not balanced by sadness.” — Carl Jung',
      '“Tears come from the heart and not from the brain.” — Leonardo da Vinci',
      '“Sadness flies away on the wings of time.” — Jean de La Fontaine',
    ],
  },
  anger: {
    images: [
      '/static/image/anger/anger1.jpg',
      '/static/image/anger/anger2.jpg',
    ],
    music: [
      '/static/music/anger/anger1.mp3',
      '/static/music/anger/anger2.mp3',
      '/static/music/anger/anger3.mp3',
    ],
    quotes: [
      '“Holding onto anger is like drinking poison and expecting the other person to die.” — Buddha',
      '“For every minute you remain angry, you give up sixty seconds of peace of mind.” — Ralph Waldo Emerson',
      '“Speak when you are angry and you will make the best speech you will ever regret.” — Ambrose Bierce',
    ],
  },
  fear: {
    images: ['/static/image/fear/fear1.jpg', '/static/image/fear/fear2.jpg'],
    music: [
      '/static/music/fear/fear1.mp3',
      '/static/music/fear/fear2.mp3',
      '/static/music/fear/fear3.mp3',
    ],
    quotes: [
      '“Do one thing every day that scares you.” — Eleanor Roosevelt',
      '“Courage is resistance to fear, mastery of fear—not absence of fear.” — Mark Twain',
      '“Everything you’ve ever wanted is on the other side of fear.” — George Addair',
    ],
  },
  love: {
    images: ['/static/image/love/love1.jpg', '/static/image/love/love2.jpg'],
    music: [
      '/static/music/love/love1.mp3',
      '/static/music/love/love2.mp3',
      '/static/music/love/love3.mp3',
    ],
    quotes: [
      'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.',
      '“Love is composed of a single soul inhabiting two bodies.” — Aristotle',
      '“Where there is love there is life.” — Mahatma Gandhi',
      '“The best thing to hold onto in life is each other.” — Audrey Hepburn',
    ],
  },
  surprise: {
    images: [
      '/static/image/surprise/surprise1.jpg',
      '/static/image/surprise/surprise2.jpg',
    ],
    music: [
      '/static/music/surprise/surprise1.mp3',
      '/static/music/surprise/surprise2.mp3',
    ],
    quotes: [
      '“Life is full of surprises, but the biggest one is learning who we really are.” — Oprah Winfrey',
      '“A good traveler has no fixed plans and is not intent on arriving.” — Lao Tzu',
      "“Sometimes we find ourselves in the middle of nowhere—only to discover it's the center of everything.” — Unknown",
    ],
  },
}
