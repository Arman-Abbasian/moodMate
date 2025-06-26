import { Mood } from '@/types/glabalTypes'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  data: Mood[]
}

export default function MoodChart({ data }: Props) {
  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#b77d00d9" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
