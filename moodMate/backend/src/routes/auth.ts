// routes/auth.ts
import express from 'express'
import { validateSignup } from '../validations/authValidators'
import { handleValidation } from '../validations/handleValidations'
import { signupHandler } from '../handlers/authHandlers'

const router = express.Router()

router.post('/signup', validateSignup, handleValidation, signupHandler)

export default router
