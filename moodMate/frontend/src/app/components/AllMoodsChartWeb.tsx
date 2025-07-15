import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { colors } from '@/constants/color'
import { AllMoodsQueryData } from '../(protected)/statistic'

type Props = {
  chartData: AllMoodsQueryData[]
  onDotClickHandler: (id: string) => void
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
  const { cx, cy, payload, onClick } = props
  const emoji = moodEmojis[payload.mood] || '❓'
  if (!cx || !cy) return null
  return (
    <svg
      x={cx - 15}
      y={cy - 10}
      width={25}
      height={25}
      onClick={() => onClick(payload.id)}
    >
      <text x={15} y={15} textAnchor="middle" fontSize={15}>
        {emoji}
      </text>
    </svg>
  )
}

const CustomTick = (props: any) => {
  const { x, y, payload } = props
  const [day, month, year] = payload.value.split(' ')

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={5} dy={16} textAnchor="middle" fontSize={12}>
        <tspan x="0" dy="0">
          {day}
        </tspan>
        <tspan x="0" dy="14">
          {month}
        </tspan>
        <tspan x="0" dy="34">
          {year}
        </tspan>
      </text>
    </g>
  )
}

export default function AllMoodsChartWeb(props: Props) {
  const { chartData, onDotClickHandler } = props

  return (
    <div className="overflow-x-auto">
      <div style={{ width: chartData.length * 100 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" tick={<CustomTick />} interval={0} />
            <YAxis
              domain={[0, 110]}
              tick={{ fontSize: 12, fill: colors.text }}
            />
            <Tooltip
              formatter={(value: any, name: any, props: any) => {
                return [`${value}`, props.payload.mood]
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={colors.primary}
              strokeWidth={2}
              dot={<CustomizedDot onClick={onDotClickHandler} />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
