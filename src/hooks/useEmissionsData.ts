
import { useState, useEffect } from 'react';

export const useEmissionsData = (
  sensor: 'CO' | 'CO2',
  session: string,
  startDate: string,
  endDate: string
) => {
  const [latestData, setLatestData] = useState<any>(null);
  const [dailyAverages, setDailyAverages] = useState<any[]>([]);
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock data for demonstration
  useEffect(() => {
    setIsLoading(true);
    
    // Mock latest data
    setLatestData({
      latestTime: '18-04-2025 12:23:58',
      latestEmission: sensor === 'CO' ? 26.91 : 849,
      CO2: 849,
      Temperature: 24,
      Humidity: 57
    });

    // Mock daily averages data
    const mockDailyAverages = Array.from({ length: 30 }, (_, i) => ({
      date: `2024-04-${String(i + 1).padStart(2, '0')}`,
      average: Math.random() * 40 + 20,
      max_co: Math.random() * 60 + 40,
      min_co: Math.random() * 20 + 10,
      average_co2: Math.random() * 400 + 600,
      max_co2: Math.random() * 600 + 800,
      min_co2: Math.random() * 200 + 400
    }));
    setDailyAverages(mockDailyAverages);

    // Mock realtime data (last 15 minutes)
    const mockRealtimeData = Array.from({ length: 15 }, (_, i) => ({
      time: new Date(Date.now() - (14 - i) * 60000).toISOString(),
      emission: sensor === 'CO' ? Math.random() * 10 + 25 : Math.random() * 100 + 800
    }));
    setRealtimeData(mockRealtimeData);

    // Mock session data
    const mockSessionData = Array.from({ length: 50 }, (_, i) => ({
      time: new Date(Date.now() - (49 - i) * 60000).toISOString(),
      emission: sensor === 'CO' ? Math.random() * 15 + 20 : Math.random() * 200 + 700
    }));
    setSessionData(mockSessionData);

    setTimeout(() => setIsLoading(false), 1000);
  }, [sensor, session, startDate, endDate]);

  return {
    latestData,
    dailyAverages,
    realtimeData,
    sessionData,
    isLoading
  };
};
