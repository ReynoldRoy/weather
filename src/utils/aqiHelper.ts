import type { LucideIcon } from 'lucide-react';
import { Smile, Meh, Frown, AlertTriangle, HelpCircle } from 'lucide-react';

export interface AqiInfo {
  level: string;
  description: string;
  colorClass: string; // Tailwind CSS class for text color based on theme
  icon: LucideIcon;
}

export const getAqiInfo = (aqi: number): AqiInfo => {
  switch (aqi) {
    case 1:
      return {
        level: 'Good',
        description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
        colorClass: 'text-chart-2', // Greenish
        icon: Smile,
      };
    case 2:
      return {
        level: 'Fair',
        description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
        colorClass: 'text-chart-4', // Yellowish
        icon: Meh,
      };
    case 3:
      return {
        level: 'Moderate',
        description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
        colorClass: 'text-chart-1', // Orangeish
        icon: Frown,
      };
    case 4:
      return {
        level: 'Poor',
        description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
        colorClass: 'text-chart-5', // Reddish
        icon: AlertTriangle,
      };
    case 5:
      return {
        level: 'Very Poor',
        description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
        colorClass: 'text-destructive', // Theme's destructive color (typically red)
        icon: AlertTriangle,
      };
    default:
      return {
        level: 'Unknown',
        description: 'AQI data is unavailable or out of the expected range.',
        colorClass: 'text-muted-foreground',
        icon: HelpCircle,
      };
  }
};
