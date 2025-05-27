
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  sensor: 'CO' | 'CO2';
}

const BarChart = ({ data, sensor }: BarChartProps) => {
  const processedData = data.map(item => ({
    date: item.date,
    average: sensor === 'CO' ? item.average : item.average_co2
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar 
            dataKey="average" 
            fill="#3b82f6"
            radius={[2, 2, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
