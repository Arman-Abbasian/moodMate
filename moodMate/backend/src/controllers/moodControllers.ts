import { Router, Request, Response, RequestHandler } from 'express'
import app from '../services/axios/axiosInstance'

const router = Router()

interface MoodRequest extends Request {
  body: {
    mood: string
  }
}

export const moodController: RequestHandler = async (
  req: MoodRequest,
  res: Response
): Promise<void> => {
  try {
    const { mood } = req.body
    const response = await app.post(
      'https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion',
      { inputs: mood }
    )

    const result = response.data

    const sorted = result.sort((a: any, b: any) => b.score - a.score)
    const topMood = sorted[0]

    res.json({
      mood: topMood.label,
      confidence: topMood.score,
      allMoods: sorted,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI mood detection failed.' })
  }
}

export default router
