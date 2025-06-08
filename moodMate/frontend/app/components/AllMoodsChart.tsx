import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { AllMoodsQueryData } from '../statistic'

type Props = {
  chartData: AllMoodsQueryData[]
}

// نگاشت حس‌ها به ایموجی‌ها
const moodEmojis: Record<string, string> = {
  joy: '😊',
  sadness: '😢',
  fear: '😨',
  anger: '😡',
  surprise: '😲',
  love: '❤️',
  disgust: '🤢',
}

// کاستوم دات برای رندر ایموجی
const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props
  const emoji = moodEmojis[payload.mood] || '❓'

  if (!cx || !cy) return null

  return (
    <svg x={cx - 10} y={cy - 10} width={30} height={30}>
      <text x={10} y={15} textAnchor="middle" fontSize={30}>
        {emoji}
      </text>
    </svg>
  )
}

export default function AllMoodsChart(props: Props) {
  const { chartData } = props

  return (
    <div className="overflow-x-auto">
      <div style={{ width: chartData.length * 100 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: any, name: any, props: any) => {
                return [`${value}`, props.payload.mood]
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              strokeWidth={2}
              dot={<CustomizedDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
