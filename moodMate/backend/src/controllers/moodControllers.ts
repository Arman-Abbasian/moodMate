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

    const end = dayjs().endOf('day').toDate()
    let start: Date

    switch (range) {
      case 'day':
        start = dayjs().subtract(1, 'day').startOf('day').toDate()
        break
      case 'week':
        start = dayjs().subtract(1, 'week').startOf('day').toDate()
        break
      case 'month':
        start = dayjs().subtract(1, 'month').startOf('day').toDate()
        break
      case 'year':
        start = dayjs().subtract(1, 'year').startOf('day').toDate()
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
      date: dayjs(entry.createdAt).format('DD MMM YYYY'),
      mood: entry.topMood.label,
      score: entry.topMood.score,
      createdAt: entry.createdAt,
    }))

    sendSuccess(
      res,
      `Top moods for ${range} retrieved successfully`,
      formatted,
      200
    )
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
    const userId = req.user?._id
    const { moodId } = req.query.moodId

    if (!moodId) {
      sendError(res, 'id is required', 400)
      return
    }

    // رکوردی با userId و createdAt دقیق پیدا کن
    const mood = await Mood.findOne({
      userId,
      _id: moodId,
    })

    if (!mood) {
      sendError(res, 'Mood not found for this timestamp', 404)
      return
    }

    sendSuccess(res, 'Mood details retrieved successfully', {
      date: dayjs(mood.createdAt).format('DD MMM YYYY HH:mm'),
      moods: mood.moods,
    })
  } catch (err) {
    console.error(err)
    sendError(res, 'Failed to fetch mood detail')
  }
}
