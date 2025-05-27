
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import DashboardHeader from './dashboard/DashboardHeader';
import ControlPanel from './dashboard/ControlPanel';
import StatsCards from './dashboard/StatsCards';
import ChartsSection from './dashboard/ChartsSection';
import { useEmissionsData } from '../hooks/useEmissionsData';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedSensor, setSelectedSensor] = useState<'CO' | 'CO2'>('CO');
  const [selectedSession, setSelectedSession] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [view, setView] = useState<'historical' | 'realtime' | 'sessions'>('historical');

  const { 
    latestData, 
    dailyAverages, 
    realtimeData, 
    sessionData,
    isLoading 
  } = useEmissionsData(selectedSensor, selectedSession, startDate, endDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Environmental Monitor</h1>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardHeader view={view} setView={setView} />
        
        <ControlPanel
          selectedSensor={selectedSensor}
          setSelectedSensor={setSelectedSensor}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          view={view}
        />
        
        <StatsCards
          latestData={latestData}
          selectedSensor={selectedSensor}
          view={view}
        />
        
        <ChartsSection
          dailyAverages={dailyAverages}
          realtimeData={realtimeData}
          sessionData={sessionData}
          selectedSensor={selectedSensor}
          view={view}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
