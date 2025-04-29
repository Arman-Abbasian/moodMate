import { RequestHandler } from 'express'
import { User } from '../models/User'
import * as bcrypt from 'bcryptjs'
import { sendError, sendSuccess } from '../utils/sendResponses'

export const signupController: RequestHandler = async (req, res) => {
  try {
    const { firstName, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      sendError(
        res,
        'Email already exists',
        {
          email: 'This email is already taken',
        },
        400
      )
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      email,
      password: hashedPassword,
    })
    sendSuccess(
      res,
      'User created successfully',
      {
        userId: newUser._id,
      },
      201
    )
  } catch (err) {
    sendError(
      res,
      'Something went wrong',
      {
        error: err,
      },
      500
    )
  }
}
