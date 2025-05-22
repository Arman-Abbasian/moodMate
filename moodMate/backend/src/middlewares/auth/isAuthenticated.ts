import { RequestHandler, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as {
      userId: string
    }
    req.userId = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' })
    return
  }
}
