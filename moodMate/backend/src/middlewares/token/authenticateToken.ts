import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { sendError } from '../../utils/sendResponses'
import { User } from '../../models/User'

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) {
      sendError(res, 'Access token is required', {}, 401)
      return
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
    next()
  } catch (err: any) {
    sendError(res, 'Invalid or expired token', err.message, 403)
  }
}
