import mongoose from 'mongoose'

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please enter the userId'],
  },
  text: {
    type: String,
    required: [true, 'please enter the text'],
    minlength: [5, 'you should enter minimum 5 characters'],
    maxlength: [500, 'you should enter maximum 500 characters'],
  },
  topMood: { type: String, required: [true, 'please enter the topMood'] },
  score: { type: Number, required: [true, 'please enter the score'] },
  allMoods: { type: Array, required: [true, 'please enter the allMoods'] }, // [{ label, score }]
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('MoodLog', moodSchema)
