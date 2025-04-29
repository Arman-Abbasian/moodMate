// routes/auth.ts
import express from 'express'
import {
  validateLogin,
  validateSignup,
} from '../middlewares/validations/authValidators'
import { handleValidation } from '../middlewares/validations/handleValidations'
import {
  loginController,
  signupController,
} from '../controllers/authControllers'

const router = express.Router()

router.post('/signup', validateSignup, handleValidation, signupController)
router.post('/login', validateLogin, handleValidation, loginController)

export default router
