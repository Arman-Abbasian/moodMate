import { NextFunction, Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'

export const redirectIfAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
      res.status(403).json({
        message: 'You are already logged in',
      })
      return
    } catch (err) {
      // توکن نامعتبر => ادامه بده
      next()
    }
  } else {
    next()
  }
}
