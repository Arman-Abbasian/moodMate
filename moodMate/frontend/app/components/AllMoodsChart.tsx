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

export default function AllMoodsChart(props: Props) {
  const { chartData } = props
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
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
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
