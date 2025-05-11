// models/User.ts
import mongoose from 'mongoose'

const moodSchema = new mongoose.Schema({
  moods: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [30, 'First name must be less than 30 characters'],
  },
  topMood: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
})

export const User = mongoose.model('Mood', moodSchema)
