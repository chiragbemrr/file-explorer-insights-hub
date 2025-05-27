
import { useState, useEffect } from 'react';

interface SessionDataItem {
  time: string[];
  CO: number;
  CO2: number;
}

interface SessionDict {
  [key: string]: SessionDataItem[];
}

export const useSessionData = (startDate: string, endDate: string) => {
  const [sessions, setSessions] = useState<string[]>([]);
  const [sessionData, setSessionData] = useState<SessionDict>({});

  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    
    const day = adjustedDate.getDate().toString().padStart(2, '0');
    const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = adjustedDate.getFullYear();
    const hours = adjustedDate.getHours().toString().padStart(2, '0');
    const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');
    const seconds = adjustedDate.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const parseCustomDate = (dateStr: string) => {
    let parts = dateStr.split(" ");
    let dateParts = parts[0].split("-");
    let timeParts = parts[1].split(":");

    return new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0]),
      parseInt(timeParts[0]),
      parseInt(timeParts[1]),
      parseInt(timeParts[2])
    );
  };

  const createSessions = (rawData: SessionDataItem[]): SessionDict => {
    const sortedData = rawData.sort((a, b) => new Date(a.time[0]).getTime() - new Date(b.time[0]).getTime());
    const resultDict: SessionDict = {};
    let currentSegment: SessionDataItem[] = [];
    let lastTime: Date | null = null;

    sortedData.forEach((item, index) => {
      const currentTime = new Date(item.time[0]);

      if (lastTime && (currentTime.getTime() - lastTime.getTime()) > 2 * 60 * 60 * 1000) {
        if (currentSegment.length > 0) {
          const key = formatDateTime(currentSegment[0].time[0]);
          resultDict[key] = currentSegment;
        }
        currentSegment = [];
      }

      currentSegment.push(item);
      lastTime = currentTime;

      if (index === sortedData.length - 1 && currentSegment.length > 0) {
        const key = formatDateTime(currentSegment[0].time[0]);
        resultDict[key] = currentSegment;
      }
    });

    return resultDict;
  };

  useEffect(() => {
    // Generate mock session data
    const generateMockSessionData = (): SessionDataItem[] => {
      const data: SessionDataItem[] = [];
      const baseDate = new Date('2024-04-18T10:00:00');
      
      // Create multiple sessions with gaps
      for (let session = 0; session < 5; session++) {
        const sessionStart = new Date(baseDate.getTime() + session * 24 * 60 * 60 * 1000);
        
        // Each session has 50-100 data points
        const pointsInSession = 50 + Math.floor(Math.random() * 50);
        
        for (let i = 0; i < pointsInSession; i++) {
          const pointTime = new Date(sessionStart.getTime() + i * 2 * 60 * 1000); // 2 minutes apart
          data.push({
            time: [pointTime.toISOString()],
            CO: 20 + Math.random() * 15,
            CO2: 700 + Math.random() * 300
          });
        }
      }
      
      return data;
    };

    const mockData = generateMockSessionData();
    const processedSessions = createSessions(mockData);
    setSessionData(processedSessions);

    // Filter sessions by date range
    const filteredSessions = Object.keys(processedSessions).filter(sessionKey => {
      if (!startDate && !endDate) return true;
      
      const sessionDate = parseCustomDate(sessionKey);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      if (start && sessionDate < start) return false;
      if (end && sessionDate > end) return false;
      
      return true;
    }).sort();

    setSessions(filteredSessions);
  }, [startDate, endDate]);

  return { sessions, sessionData };
};
