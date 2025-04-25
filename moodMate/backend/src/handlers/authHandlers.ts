import { RequestHandler } from 'express'
import { User } from '../models/User'
import * as bcrypt from 'bcryptjs'

export const signupHandler: RequestHandler = async (req, res) => {
  try {
    const { firstName, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      email,
      password: hashedPassword,
    })

    res
      .status(201)
      .json({ message: 'User created successfully', userId: newUser._id })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err })
  }
}
