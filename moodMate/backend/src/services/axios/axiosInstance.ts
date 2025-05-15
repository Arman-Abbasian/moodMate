import axios from 'axios'

const app = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})
export default app
