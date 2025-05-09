import type { LucideIcon } from 'lucide-react';
import { Smile, Meh, Frown, AlertTriangle, Skull, HelpCircle } from 'lucide-react'; // Added Skull for Hazardous

export interface AqiInfo {
  level: string;
  description: string;
  colorClass: string; // Tailwind CSS class for text color based on theme
  icon: LucideIcon;
  aqiValue?: number; // Store the original EPA index if needed
}

// Maps WeatherAPI US EPA Index (1-6) to display information
export const getAqiInfo = (usEpaIndex?: number): AqiInfo => {
  if (usEpaIndex === undefined) {
    return {
        level: 'Unavailable',
        description: 'AQI data is not available for this location.',
        colorClass: 'text-muted-foreground',
        icon: HelpCircle,
      };
  }

  switch (usEpaIndex) {
    case 1: // Good
      return {
        level: 'Good',
        description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
        colorClass: 'text-chart-2', // Greenish
        icon: Smile,
        aqiValue: usEpaIndex,
      };
    case 2: // Moderate
      return {
        level: 'Moderate',
        description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
        colorClass: 'text-chart-4', // Yellowish
        icon: Meh,
        aqiValue: usEpaIndex,
      };
    case 3: // Unhealthy for Sensitive Groups
      return {
        level: 'Unhealthy for Sensitive Groups',
        description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
        colorClass: 'text-chart-1', // Orangeish
        icon: Frown,
        aqiValue: usEpaIndex,
      };
    case 4: // Unhealthy
      return {
        level: 'Unhealthy',
        description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
        colorClass: 'text-chart-5', // Reddish
        icon: AlertTriangle,
        aqiValue: usEpaIndex,
      };
    case 5: // Very Unhealthy
      return {
        level: 'Very Unhealthy',
        description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
        colorClass: 'text-destructive', // Theme's destructive color
        icon: AlertTriangle, // Using AlertTriangle, could use a stronger one
        aqiValue: usEpaIndex,
      };
    case 6: // Hazardous
      return {
        level: 'Hazardous',
        description: 'Health alert: everyone may experience more serious health effects. Everyone should avoid all outdoor exertion.',
        colorClass: 'text-destructive font-bold', // Emphasize destructive
        icon: Skull, // Using Skull for hazardous
        aqiValue: usEpaIndex,
      };
    default:
      return {
        level: 'Unknown',
        description: 'AQI data is out of the expected range or unavailable.',
        colorClass: 'text-muted-foreground',
        icon: HelpCircle,
        aqiValue: usEpaIndex,
      };
  }
};
