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
} from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Idade',
    uv: 4000,
    probabilidade: 0.24,
    amt: 2400,
  },
  {
    name: 'Score de crédito',
    uv: 3000,
    probabilidade: 0.13,
    amt: 2210,
  },
  {
    name: 'País',
    uv: 2000,
    probabilidade: 0.98,
    amt: 2290,
  },
  {
    name: 'Sexo',
    uv: 2780,
    probabilidade: 0.39,
    amt: 2000,
  },
  {
    name: 'Tempo de trabalho',
    uv: 1890,
    probabilidade: 0.48,
    amt: 2181,
  }
];

// #endregion
const getIntroOfPage = (label: string | number | undefined) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          {/* <p className="desc">Testando...</p> */}
        </>
      )}
    </div>
  );
};

const CustomContentOfTooltip = ({
  isAnimationActive = true,
  defaultIndex,
}: {
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
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip content={CustomTooltip} isAnimationActive={isAnimationActive} defaultIndex={defaultIndex} />
      <Legend />
      <Bar dataKey="probabilidade" barSize={20} fill="#ff5858" isAnimationActive={isAnimationActive} />
    </BarChart>
  );
};

export default CustomContentOfTooltip;