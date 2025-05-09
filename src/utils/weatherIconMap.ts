import type { LucideIcon } from 'lucide-react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  Cloudy,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  HelpCircle,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  '01d': Sun,
  '01n': Moon,
  '02d': CloudSun,
  '02n': CloudMoon,
  '03d': Cloud,
  '03n': Cloud,
  '04d': Cloudy,
  '04n': Cloudy,
  '09d': CloudRain,
  '09n': CloudRain,
  '10d': CloudDrizzle,
  '10n': CloudDrizzle,
  '11d': CloudLightning,
  '11n': CloudLightning,
  '13d': CloudSnow,
  '13n': CloudSnow,
  '50d': CloudFog,
  '50n': CloudFog,
};

export const getWeatherIconComponent = (iconCode: string): LucideIcon => {
  return iconMap[iconCode] || HelpCircle; // Default to HelpCircle if no icon matches
};
