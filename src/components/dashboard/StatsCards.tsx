
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  latestData: any;
  selectedSensor: 'CO' | 'CO2';
  view: string;
}

const StatsCards = ({ latestData, selectedSensor, view }: StatsCardsProps) => {
  const getAirQuality = (value: number, sensor: 'CO' | 'CO2') => {
    if (sensor === 'CO') {
      if (value < 15) return { status: 'Good', color: 'text-green-600' };
      if (value <= 50) return { status: 'Acceptable', color: 'text-orange-600' };
      return { status: 'Unhealthy', color: 'text-red-600' };
    } else {
      if (value < 800) return { status: 'Good', color: 'text-green-600' };
      if (value <= 1200) return { status: 'Acceptable', color: 'text-orange-600' };
      return { status: 'Unhealthy', color: 'text-red-600' };
    }
  };

  const airQuality = latestData ? getAirQuality(
    selectedSensor === 'CO' ? latestData.latestEmission : latestData.CO2,
    selectedSensor
  ) : { status: 'Loading...', color: 'text-gray-600' };

  if (view === 'realtime') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-600 mb-1">Latest Time</h3>
            <p className="text-lg font-bold text-orange-600">
              {latestData?.latestTime || '18-04-2025 12:23:38'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-600 mb-1">CO (PPM)</h3>
            <p className="text-lg font-bold text-orange-600">
              {latestData?.latestEmission || '26.98'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-600 mb-1">CO2 (PPM)</h3>
            <p className="text-lg font-bold text-orange-600">
              {latestData?.CO2 || '849'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-600 mb-1">Temperature (°C)</h3>
            <p className="text-lg font-bold text-orange-600">
              {latestData?.Temperature || '24'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-600 mb-1">Humidity (%)</h3>
            <p className="text-lg font-bold text-orange-600">
              {latestData?.Humidity || '57'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === 'sessions') {
    return (
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Start Time</h3>
              <p className="text-lg font-bold text-orange-600">18-04-2025 10:57:21</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Latest Value</h3>
              <p className="text-lg font-bold text-orange-600">26.67</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Sensor Name</h3>
              <p className="text-lg font-bold text-orange-600">CO</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Unit Of Measurement</h3>
              <p className="text-lg font-bold text-orange-600">Parts Per Million (PPM)</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">End Time</h3>
              <p className="text-lg font-bold text-orange-600">18-04-2025 12:24:39</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Minimum Value</h3>
              <p className="text-lg font-bold text-orange-600">14.31</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Average Value</h3>
              <p className="text-lg font-bold text-orange-600">23.02</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-600 mb-1">Maximum Value</h3>
              <p className="text-lg font-bold text-orange-600">30.96</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-gray-600 mb-1">Latest Time</h3>
          <p className="text-lg font-bold text-orange-600">
            {latestData?.latestTime || '18-04-2025 12:23:58'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-gray-600 mb-1">Current Emission (PPM)</h3>
          <p className="text-lg font-bold text-orange-600">
            {selectedSensor === 'CO' 
              ? (latestData?.latestEmission || '26.91')
              : (latestData?.CO2 || '849')
            }
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-gray-600 mb-1">Air Quality</h3>
          <p className={`text-lg font-bold ${airQuality.color}`}>
            {airQuality.status}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
