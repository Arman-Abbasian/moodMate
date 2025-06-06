import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { sendError } from '../../utils/sendResponses'

export const blockIfAccessTokenValid: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      // اگر توکن هنوز معتبره، نیازی به رفرش توکن نیست
      jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
      sendError(
        res,
        'Access token is still valid, no need to refresh.',
        {},
        400
      )
      return
    } catch (err) {
      // اگر توکن منقضی شده یا نامعتبره، اجازه ادامه بده
      next()
    }
  } else {
    // اگر اصلاً access token نیست، ادامه بده تا با refresh token بررسی بشه
    next()
  }
}
