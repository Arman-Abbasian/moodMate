import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import moodRoutes from './routes/mood'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, '..', 'public')))
app.use('/api/mood', moodRoutes)
app.use((req, res) => {
  res.status(404).json({ error: 'مسیر مورد نظر یافت نشد' })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err)
  res
    .status(500)
    .json({ error: 'مشکلی پیش آمده است. لطفاً بعداً دوباره تلاش کنید.' })
})
app
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
  .on('error', (err) => {
    console.error('❌ Server failed to start:', err)
  })
