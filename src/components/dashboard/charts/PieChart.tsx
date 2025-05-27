
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PieChartProps {
  sensor: 'CO' | 'CO2';
}

const PieChart = ({ sensor }: PieChartProps) => {
  const data = sensor === 'CO' 
    ? [
        { name: 'Good', value: 19.6, color: '#22c55e' },
        { name: 'Acceptable', value: 80.4, color: '#f59e0b' },
        { name: 'Unhealthy', value: 0.0, color: '#ef4444' }
      ]
    : [
        { name: 'Good', value: 45.2, color: '#22c55e' },
        { name: 'Acceptable', value: 32.8, color: '#f59e0b' },
        { name: 'Unhealthy', value: 22.0, color: '#ef4444' }
      ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
