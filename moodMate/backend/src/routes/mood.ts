import express from 'express'
import {
  moodController,
  statisticsController,
} from '../controllers/moodControllers'
import { handleValidation } from '../middlewares/validations/handleValidations'
import { validateMood } from '../middlewares/validations/moodValidators'
import { isAuthenticated } from '../middlewares/auth/isAuthenticated'

const router = express.Router()
router.post(
  '/',
  validateMood,
  isAuthenticated,
  handleValidation,
  moodController
)
router.post(
  '/statistics',
  isAuthenticated,
  validateMood,
  handleValidation,
  statisticsController
)
export default router
