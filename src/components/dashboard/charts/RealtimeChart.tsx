
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RealtimeChartProps {
  data: any[];
  sensor: 'CO' | 'CO2';
}

const RealtimeChart = ({ data, sensor }: RealtimeChartProps) => {
  const processedData = data.map(item => ({
    time: new Date(item.time).toLocaleTimeString(),
    emission: item.emission
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="emission" 
            stroke="#2563eb" 
            strokeWidth={3}
            dot={{ r: 5, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealtimeChart;
