import { RequestHandler } from 'express'
import { User } from '../models/User'
import * as bcrypt from 'bcryptjs'
import { sendError, sendSuccess } from '../utils/sendResponses'
import jwt, { VerifyErrors } from 'jsonwebtoken'

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
      { expiresIn: '1d' }
    )

    const refreshToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '7d' }
    )

    sendSuccess(
      res,
      'Logged in successfully',
      {
        user: {
          id: existingUser._id,
          firstName: existingUser.firstName,
          email: existingUser.email,
        },
        accessToken,
        refreshToken,
      },
      200
    )
  } catch (err) {
    sendError(res, 'Something went wrong', { error: err }, 500)
  }
}

export const refreshTokenController: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      sendError(res, 'Refresh token is required', {}, 400)
      return
    }

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
      async (err: VerifyErrors | null, decoded: any) => {
        if (err || !decoded?.userId) {
          sendError(res, 'Invalid refresh token', {}, 403)
          return
        }

        // Optional: Check if token exists in DB
        const user = await User.findById(decoded.userId)
        if (!user) {
          sendError(res, 'User not found', {}, 404)
          return
        }

        // Generate new tokens
        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_ACCESS_SECRET as string,
          { expiresIn: '1d' }
        )

        const newRefreshToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_REFRESH_SECRET as string,
          { expiresIn: '7d' }
        )

        sendSuccess(
          res,
          'Tokens refreshed successfully',
          {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
          200
        )
      }
    )
  } catch (err) {
    sendError(res, 'Something went wrong', { error: err }, 500)
  }
}
