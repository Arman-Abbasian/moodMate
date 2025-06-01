import { Mood } from '@/types/glabalTypes'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  chartData: any
  moods: Mood[]
}

export default function AllMoodsChart(props: Props) {
  const { chartData, moods } = props
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <XAxis dataKey="score" />
        <YAxis />
        <Tooltip />
        <Legend />
        {moods.map((mood) => (
          <Line
            key={mood.label}
            type="monotone"
            dataKey={mood.score}
            stroke={'#ffc658'}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
