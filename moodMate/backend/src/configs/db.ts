import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load env variables
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI as string

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected successfully 🚀')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit process with failure
  }
}
