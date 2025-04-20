import express from 'express'
import cors from 'cors'
import moodRoutes from './routes/mood'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api/mood', moodRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
