// routes/auth.ts
import express from 'express'
import { validateSignup } from '../middlewares/validations/authValidators'
import { handleValidation } from '../middlewares/validations/handleValidations'
import { signupController } from '../controllers/authControllers'

const router = express.Router()

router.post('/signup', validateSignup, handleValidation, signupController)

export default router
