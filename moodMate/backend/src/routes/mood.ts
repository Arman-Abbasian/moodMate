import express from 'express'
import {
  moodController,
  statisticsController,
} from '../controllers/moodControllers'
import { handleValidation } from '../middlewares/validations/handleValidations'
import { validateMood } from '../middlewares/validations/moodValidators'

const router = express.Router()
router.post('/', validateMood, handleValidation, moodController)
router.post('/statistics', validateMood, handleValidation, statisticsController)
export default router
