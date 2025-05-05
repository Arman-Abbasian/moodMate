import express from 'express'
import { moodController } from '../controllers/moodControllers'
import { handleValidation } from '../middlewares/validations/handleValidations'
import { validateMood } from '../middlewares/validations/moodValidators'

const router = express.Router()
router.post('/', validateMood, handleValidation, moodController)
export default router
