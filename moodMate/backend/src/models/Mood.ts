import mongoose from 'mongoose'

const moodTypeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { _id: false } // چون قراره فقط یک فیلد توی یک سند بزرگ‌تر باشه، نیازی به `_id` نداره
)
const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please enter the userId'],
  },
  topMood: {
    type: moodTypeSchema,
    required: [true, 'please enter the topMood'],
  },
  moods: {
    type: [moodTypeSchema],
    required: [true, 'please enter the allMoods'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Mood', moodSchema)
