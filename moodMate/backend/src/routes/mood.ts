import axios from 'axios'
import { Router, Request, Response } from 'express'

const router = Router()

interface MoodRequest extends Request {
  body: {
    text: string
  }
}

router.post('/', async (req: MoodRequest, res: Response): Promise<void> => {
  const { text } = req.body

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Please provide a valid text.' })
    return
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion',
      { inputs: text }
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
})

export default router
