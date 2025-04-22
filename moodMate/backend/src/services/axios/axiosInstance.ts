import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
  },
})

export default axiosInstance
