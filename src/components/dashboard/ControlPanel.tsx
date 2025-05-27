
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface ControlPanelProps {
  selectedSensor: 'CO' | 'CO2';
  setSelectedSensor: (sensor: 'CO' | 'CO2') => void;
  selectedSession: string;
  setSelectedSession: (session: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  view: string;
}

const ControlPanel = ({
  selectedSensor,
  setSelectedSensor,
  selectedSession,
  setSelectedSession,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  view
}: ControlPanelProps) => {
  const sessions = [
    '31-12-2018 20:30:00',
    '15-01-2019 14:15:00',
    '28-02-2019 09:45:00',
    '10-03-2019 16:20:00',
    '22-04-2019 11:30:00'
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Select Sensor</Label>
            <Select
              value={selectedSensor}
              onValueChange={(value: 'CO' | 'CO2') => setSelectedSensor(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CO">Carbon Monoxide (CO)</SelectItem>
                <SelectItem value="CO2">Carbon Dioxide (CO2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {view === 'sessions' && (
            <div className="space-y-2">
              <Label>Select Session</Label>
              <Select
                value={selectedSession}
                onValueChange={setSelectedSession}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session} value={session}>
                      {session}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
