import express from 'express'
import {
  getMoodDetailsByDateAndLabel,
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
router.get('/statistics', isAuthenticated, statisticsController)
router.get(`/:moodId`, isAuthenticated, getMoodDetailsByDateAndLabel)
export default router
