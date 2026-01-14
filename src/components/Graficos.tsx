import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipContentProps,
  TooltipIndex,
  Cell,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
} from 'recharts';
import { ChartData, DistribuicaoRisco } from '../@types/dashboard';

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </>
      )}
    </div>
  );
};


export const GraficoBarra = ({
  data,
  isAnimationActive = true,
  defaultIndex,
}: {
  data: ChartData[];
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '800px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="fator" />
      <YAxis width="auto" />
      <Tooltip content={CustomTooltip} isAnimationActive={isAnimationActive} defaultIndex={defaultIndex} />
      <Legend />
      <Bar dataKey="total" radius={[10, 10, 0, 0]} barSize={20} fill="#3b82f6" isAnimationActive={isAnimationActive} />
    </BarChart>
  );
};

export const GraficoPizza = ({
  data,
}: {
  data: DistribuicaoRisco[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={{ fontSize: 22 }}
        >
          {data.map((entry: DistribuicaoRisco, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        />
      </RechartsPie>
    </ResponsiveContainer>
  )
}