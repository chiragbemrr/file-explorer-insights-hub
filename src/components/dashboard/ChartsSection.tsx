
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmissionChart from './charts/EmissionChart';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import RealtimeChart from './charts/RealtimeChart';
import SessionChart from './charts/SessionChart';
import { Slider } from '@/components/ui/slider';

interface ChartsSectionProps {
  dailyAverages: any[];
  realtimeData: any[];
  sessionData: any[];
  selectedSensor: 'CO' | 'CO2';
  view: string;
  isLoading: boolean;
}

const ChartsSection = ({
  dailyAverages,
  realtimeData,
  sessionData,
  selectedSensor,
  view,
  isLoading
}: ChartsSectionProps) => {
  if (view === 'realtime') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Emissions of Last 15 Minutes</CardTitle>
            </CardHeader>
            <CardContent>
              <RealtimeChart data={realtimeData} sensor={selectedSensor} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emissions Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart sensor={selectedSensor} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (view === 'sessions') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Session Data Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionChart data={sessionData} sensor={selectedSensor} />
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Adjust the slider to view previous data</p>
              <Slider
                defaultValue={[100]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Maximum And Minimum Emission Values Over Date</CardTitle>
        </CardHeader>
        <CardContent>
          <EmissionChart data={dailyAverages} sensor={selectedSensor} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Average {selectedSensor} Emission In PPM Over Date</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={dailyAverages} sensor={selectedSensor} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emissions Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart sensor={selectedSensor} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartsSection;
