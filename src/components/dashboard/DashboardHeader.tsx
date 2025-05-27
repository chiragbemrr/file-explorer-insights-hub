
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  view: 'historical' | 'realtime' | 'sessions';
  setView: (view: 'historical' | 'realtime' | 'sessions') => void;
}

const DashboardHeader = ({ view, setView }: DashboardHeaderProps) => {
  const getTitle = () => {
    switch (view) {
      case 'historical':
        return 'CO EMISSION HISTORICAL DATA';
      case 'realtime':
        return 'EMISSION DATA OF LAST 15 MINUTES';
      case 'sessions':
        return 'SESSIONS OVERVIEW';
      default:
        return 'ENVIRONMENTAL MONITORING';
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-yellow-800 to-yellow-900 rounded-lg p-6 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          {getTitle()}
        </h1>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={() => setView('historical')}
          variant={view === 'historical' ? 'default' : 'outline'}
          className="min-w-[120px]"
        >
          Historical
        </Button>
        <Button
          onClick={() => setView('realtime')}
          variant={view === 'realtime' ? 'default' : 'outline'}
          className="min-w-[120px]"
        >
          Real-time
        </Button>
        <Button
          onClick={() => setView('sessions')}
          variant={view === 'sessions' ? 'default' : 'outline'}
          className="min-w-[120px]"
        >
          Sessions
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
