import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import moodRoutes from './routes/mood'
import path from 'path'
import dotenv from 'dotenv'
import { connectDB } from './configs/db'
import authRoutes from './routes/auth'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, '..', 'public')))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/mood', moodRoutes)
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'route not found' })
})

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'some thing went wrong' })
})
connectDB()
app
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
  .on('error', (err) => {
    console.error('❌ Server failed to start:', err)
  })
