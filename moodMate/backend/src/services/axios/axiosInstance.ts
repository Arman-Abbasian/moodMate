import axios from 'axios'

const app = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
  },
})

export default app
