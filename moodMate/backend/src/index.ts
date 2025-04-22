import express from 'express'
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
