
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmissionChartProps {
  data: any[];
  sensor: 'CO' | 'CO2';
}

const EmissionChart = ({ data, sensor }: EmissionChartProps) => {
  const processedData = data.map(item => ({
    date: item.date,
    max: sensor === 'CO' ? item.max_co : item.max_co2,
    min: sensor === 'CO' ? item.min_co : item.min_co2
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="max" 
            stroke="#2563eb" 
            strokeWidth={2}
            name="Max Values"
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="min" 
            stroke="#ea580c" 
            strokeWidth={2}
            name="Min Values"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionChart;
