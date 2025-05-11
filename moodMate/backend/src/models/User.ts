import mongoose, { Document, Model } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema<IUser>({
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
  },
})

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)
