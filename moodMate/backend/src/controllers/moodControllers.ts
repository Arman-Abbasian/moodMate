import { Request, Response } from 'express'
import { moodResources } from '../data/moodResources'
import app from '../services/axios/axiosInstance'
import { getRandomItem } from '../utils/getRandomItem'
import Mood from '../models/Mood'

interface MoodItem {
  label: string
  score: number
}

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

    const result = response.data.flat()
    const sorted = result.sort((a: any, b: any) => b.score - a.score)
    const simplified: MoodItem[] = sorted.map((item: MoodItem) => ({
      label: item.label,
      score: Math.round(item.score * 100),
    }))
    const topMood = simplified[0]
    const allResources = moodResources[topMood.label.toLocaleLowerCase()]
    const resources = {
      image: getRandomItem(allResources?.images || []),
      music: getRandomItem(allResources?.music || []),
      quote: getRandomItem(allResources?.quotes || []),
    }

    await Mood.create({
      userId: req.userId, // مطمئن شو middleware احراز هویت، userId رو اضافه می‌کنه
      topMood,
      moods: simplified,
    })
    res.json({
      topMood,
      moods: simplified,
      resources,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI mood detection failed.' })
  }
}

export const statisticsController = async (req: MoodRequest, res: Response) => {
  try {
    const { mood } = req.body
  } catch (error) {
    console.error(error)
  }
}
