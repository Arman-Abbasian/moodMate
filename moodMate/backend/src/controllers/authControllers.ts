import { RequestHandler } from 'express'
import { User } from '../models/User'
import * as bcrypt from 'bcryptjs'
import { sendError, sendSuccess } from '../utils/sendResponses'
import jwt from 'jsonwebtoken'

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

export const loginController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      sendError(
        res,
        'Email or password is incorrect',
        {
          login: 'This email or password is incorrect',
        },
        401
      )
      return
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordCorrect) {
      sendError(
        res,
        'Email or password is incorrect',
        {
          login: 'This email or password is incorrect',
        },
        401
      )
      return
    }

    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '7d' }
    )

    // ذخیره Refresh Token در کوکی امن
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // ذخیره Access Token در کوکی امن
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    sendSuccess(
      res,
      'Logged in successfully',
      {
        user: {
          id: existingUser._id,
          firstName: existingUser.firstName,
          email: existingUser.email,
        },
      },
      200
    )
  } catch (err) {
    sendError(res, 'Something went wrong', { error: err }, 500)
  }
}
