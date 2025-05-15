import { Request, Response } from 'express'
import { moodResources } from '../data/moodResources'
import app from '../services/axios/axiosInstance'
import { getRandomItem } from '../utils/getRandomItem'
interface MoodRequest extends Request {
  body: {
    mood: string
  }
}

export const moodController = async (req: MoodRequest, res: Response) => {
  try {
    const { mood } = req.body

    const response = await app.post(
      'https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion',
      { inputs: mood }
    )

    const result = response.data
    const sorted = result.sort((a: any, b: any) => b.score - a.score)
    const topMood = sorted[0].label.toLowerCase()

    const allResources = moodResources[topMood]

    const resources = {
      image: getRandomItem(allResources?.images || []),
      video: getRandomItem(allResources?.videos || []),
      music: getRandomItem(allResources?.music || []),
      quote: getRandomItem(allResources?.quotes || []),
    }

    res.json({
      mood: topMood,
      allMoods: sorted,
      resources,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI mood detection failed.' })
  }
}
