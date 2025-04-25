// models/User.ts
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [30, 'First name must be less than 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [30, 'Password must be less than 30 characters'],
    validate: {
      validator: function (value: string) {
        return /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)
      },
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    },
  },
})

export const User = mongoose.model('User', userSchema)
