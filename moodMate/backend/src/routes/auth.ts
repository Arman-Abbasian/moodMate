// routes/auth.ts
import express from 'express'
import {
  validateLogin,
  validateSignup,
} from '../middlewares/validations/authValidators'
import { handleValidation } from '../middlewares/validations/handleValidations'
import {
  loginController,
  refreshTokenController,
  signupController,
} from '../controllers/authControllers'
import { redirectIfAuthenticated } from '../middlewares/auth/redirectIfAuthenticated'
import { blockIfAccessTokenValid } from '../middlewares/auth/blockIfAccessTokenValid'

const router = express.Router()

router.post(
  '/signup',
  redirectIfAuthenticated,
  validateSignup,
  handleValidation,
  signupController
)
router.post(
  '/login',
  redirectIfAuthenticated,
  validateLogin,
  handleValidation,
  loginController
)
router.post('refreshToken', blockIfAccessTokenValid, refreshTokenController)
export default router
