import { Request, Response } from 'express'
import { moodResources } from '../data/moodResources'
import app from '../services/axios/axiosInstance'
import { getRandomItem } from '../utils/getRandomItem'
import Mood from '../models/Mood'
import { sendError, sendSuccess } from '../utils/sendResponses'
import dayjs from 'dayjs'

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
    const userId = req.userId
    const range = (req.query.range as string) || 'month'

    let start: Date
    let end: Date = dayjs().endOf('day').toDate()

    switch (range) {
      case 'day':
        start = dayjs().startOf('day').toDate()
        break
      case 'week':
        start = dayjs().startOf('week').toDate()
        break
      case 'month':
        start = dayjs().startOf('month').toDate()
        break
      case 'year':
        start = dayjs().startOf('year').toDate()
        break
      default:
        sendError(res, 'Invalid range. Use day, week, month, or year.')
        return
    }

    const moods = await Mood.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    })
      .select('topMood createdAt')
      .sort({ createdAt: 1 })

    const formatted = moods.map((entry) => ({
      date: entry.createdAt,
      topMood: entry.topMood,
    }))

    sendSuccess(res, `Top moods for ${range} retrieved successfully`, formatted)
  } catch (error) {
    console.error('Error in getTopMoodsByRange:', error)
    sendError(res, 'Failed to get mood statistics')
  }
}
export const getMoodDetailsByDateAndLabel = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.userId
    const { date, mood } = req.query

    if (!date || typeof date !== 'string') {
      sendError(res, 'Please provide a valid date in YYYY-MM-DD format')
      return
    }

    if (!mood || typeof mood !== 'string') {
      sendError(res, 'Please provide a mood label (e.g. "sadness")')
      return
    }

    const start = dayjs(date).startOf('day').toDate()
    const end = dayjs(date).endOf('day').toDate()

    const moods = await Mood.find({
      userId,
      'topMood.label': mood,
      createdAt: { $gte: start, $lte: end },
    })
      .select('topMood moods createdAt')
      .sort({ createdAt: 1 })

    if (!moods.length) {
      sendSuccess(res, 'No matching mood data found', [])
      return
    }

    sendSuccess(res, `Mood entries for ${mood} on ${date}`, moods)
  } catch (error) {
    console.error('Error in getMoodDetailsByDateAndLabel:', error)
    sendError(res, 'Failed to get mood details')
  }
}
