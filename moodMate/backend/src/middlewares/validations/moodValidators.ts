// middlewares/validateSignup.ts
import { body } from 'express-validator'

export const validateMood = [
  body('mood')
    .notEmpty()
    .withMessage('mood is required')
    .isLength({ min: 6 })
    .withMessage('mood description must be at least 6 characters long')
    .isLength({ max: 500 })
    .withMessage('mood description must be maximum 500 characters long'),
]
