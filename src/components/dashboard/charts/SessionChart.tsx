
import { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';

interface SessionChartProps {
  data: any[];
  sensor: 'CO' | 'CO2';
}

const SessionChart = ({ data, sensor }: SessionChartProps) => {
  const [sliderValue, setSliderValue] = useState([100]);
  const [visibleData, setVisibleData] = useState<any[]>([]);
  
  const pointsPerSegment = Math.floor(600 / 45); // Approximately 13 points visible at once

  useEffect(() => {
    if (data && data.length > 0) {
      const maxStartIndex = Math.max(0, data.length - pointsPerSegment);
      const startIndex = Math.floor((sliderValue[0] / 100) * maxStartIndex);
      const endIndex = Math.min(startIndex + pointsPerSegment, data.length);
      
      const processedData = data.slice(startIndex, endIndex).map(item => ({
        time: new Date(item.time).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        emission: item.emission || (sensor === 'CO' ? item.CO : item.CO2),
        fullTime: new Date(item.time).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }));
      
      setVisibleData(processedData);
    }
  }, [data, sensor, sliderValue, pointsPerSegment]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="text-sm font-medium">{`Timestamp: ${data.fullTime}`}</p>
          <p className="text-sm text-blue-600">
            {`Emission: ${payload[0].value.toFixed(2)} ppm`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visibleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: '↑ Emission(PPM)', angle: 0, position: 'insideTopLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="emission" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#2563eb' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Adjust the slider to view previous data</p>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SessionChart;
