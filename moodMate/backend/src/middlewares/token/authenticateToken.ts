import { Request, Response, NextFunction, RequestHandler } from 'express'
import { sendError } from '../../utils/sendResponses'
import { IUser, User } from '../../models/User'
import jwt from 'jsonwebtoken'
import { HydratedDocument } from 'mongoose'

export const authenticateToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) {
      sendError(res, 'Access token is required', {}, 401)
      return // این فقط برای جلوگیری از ادامه‌ی اجرای تابع
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as { userId: string }

    const user = await User.findById(decoded.userId)
    if (!user) {
      sendError(res, 'User does not exist', {}, 401)
      return
    }

    req.user = user as HydratedDocument<IUser>
    next()
  } catch (err: any) {
    sendError(res, 'Invalid or expired token', err.message, 401)
  }
}
