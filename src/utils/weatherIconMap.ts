import type { LucideIcon } from 'lucide-react';
import {
  Sun, Moon, CloudSun, CloudMoon, Cloud, Cloudy, CloudFog,
  CloudHail, CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
  Tornado, Wind, HelpCircle, Umbrella, Snowflake, Zap, Waves,
  ThermometerSun, ThermometerSnowflake
} from 'lucide-react';

// WeatherAPI condition codes documentation: https://www.weatherapi.com/docs/weather_conditions.json
// isDay: 1 for day, 0 for night

interface ConditionMapEntry {
  day: LucideIcon;
  night: LucideIcon;
  description?: string; // Optional, for reference
}

const conditionCodeMap: Record<number, ConditionMapEntry> = {
  1000: { day: Sun, night: Moon, description: 'Sunny/Clear' },
  1003: { day: CloudSun, night: CloudMoon, description: 'Partly cloudy' },
  1006: { day: Cloud, night: Cloud, description: 'Cloudy' },
  1009: { day: Cloudy, night: Cloudy, description: 'Overcast' },
  1030: { day: CloudFog, night: CloudFog, description: 'Mist' }, // Using CloudFog for Mist
  1063: { day: CloudDrizzle, night: CloudDrizzle, description: 'Patchy rain possible' },
  1066: { day: CloudSnow, night: CloudSnow, description: 'Patchy snow possible' },
  1069: { day: CloudDrizzle, night: CloudDrizzle, description: 'Patchy sleet possible' }, // Sleet like drizzle
  1072: { day: CloudDrizzle, night: CloudDrizzle, description: 'Patchy freezing drizzle possible' },
  1087: { day: CloudLightning, night: CloudLightning, description: 'Thundery outbreaks possible' },
  1114: { day: CloudSnow, night: CloudSnow, description: 'Blowing snow' }, // Using CloudSnow
  1117: { day: CloudSnow, night: CloudSnow, description: 'Blizzard' }, // Using CloudSnow
  1135: { day: CloudFog, night: CloudFog, description: 'Fog' },
  1147: { day: CloudFog, night: CloudFog, description: 'Freezing fog' },
  1150: { day: CloudDrizzle, night: CloudDrizzle, description: 'Patchy light drizzle' },
  1153: { day: CloudDrizzle, night: CloudDrizzle, description: 'Light drizzle' },
  1168: { day: CloudDrizzle, night: CloudDrizzle, description: 'Freezing drizzle' }, // Freezing Drizzle
  1171: { day: CloudRain, night: CloudRain, description: 'Heavy freezing drizzle' }, // Heavier Freezing Drizzle -> Rain
  1180: { day: CloudDrizzle, night: CloudDrizzle, description: 'Patchy light rain' },
  1183: { day: CloudRain, night: CloudRain, description: 'Light rain' },
  1186: { day: CloudRain, night: CloudRain, description: 'Moderate rain at times' },
  1189: { day: CloudRain, night: CloudRain, description: 'Moderate rain' },
  1192: { day: CloudRain, night: CloudRain, description: 'Heavy rain at times' },
  1195: { day: CloudRain, night: CloudRain, description: 'Heavy rain' },
  1198: { day: CloudRain, night: CloudRain, description: 'Light freezing rain' }, // Freezing Rain
  1201: { day: CloudRain, night: CloudRain, description: 'Moderate or heavy freezing rain' },
  1204: { day: CloudDrizzle, night: CloudDrizzle, description: 'Light sleet' }, // Sleet
  1207: { day: CloudHail, night: CloudHail, description: 'Moderate or heavy sleet' }, // Sleet
  1210: { day: CloudSnow, night: CloudSnow, description: 'Patchy light snow' },
  1213: { day: CloudSnow, night: CloudSnow, description: 'Light snow' },
  1216: { day: CloudSnow, night: CloudSnow, description: 'Patchy moderate snow' },
  1219: { day: CloudSnow, night: CloudSnow, description: 'Moderate snow' },
  1222: { day: CloudSnow, night: CloudSnow, description: 'Patchy heavy snow' },
  1225: { day: CloudSnow, night: CloudSnow, description: 'Heavy snow' },
  1237: { day: CloudHail, night: CloudHail, description: 'Ice pellets' },
  1240: { day: CloudRain, night: CloudRain, description: 'Light rain shower' }, // Shower
  1243: { day: CloudRain, night: CloudRain, description: 'Moderate or heavy rain shower' },
  1246: { day: CloudRain, night: CloudRain, description: 'Torrential rain shower' },
  1249: { day: CloudHail, night: CloudHail, description: 'Light sleet showers' }, // Sleet shower
  1252: { day: CloudHail, night: CloudHail, description: 'Moderate or heavy sleet showers' },
  1255: { day: CloudSnow, night: CloudSnow, description: 'Light snow showers' }, // Snow shower
  1258: { day: CloudSnow, night: CloudSnow, description: 'Moderate or heavy snow showers' },
  1261: { day: CloudHail, night: CloudHail, description: 'Light showers of ice pellets' }, // Ice pellet shower
  1264: { day: CloudHail, night: CloudHail, description: 'Moderate or heavy showers of ice pellets' },
  1273: { day: CloudLightning, night: CloudLightning, description: 'Patchy light rain with thunder' }, // Thunder
  1276: { day: CloudLightning, night: CloudLightning, description: 'Moderate or heavy rain with thunder' },
  1279: { day: CloudLightning, night: CloudLightning, description: 'Patchy light snow with thunder' }, // Snow with Thunder
  1282: { day: CloudLightning, night: CloudLightning, description: 'Moderate or heavy snow with thunder' },
};

export const getWeatherIconComponent = (conditionCode: number, isDay: number): LucideIcon => {
  const mapping = conditionCodeMap[conditionCode];
  if (mapping) {
    return isDay === 1 ? mapping.day : mapping.night;
  }
  return HelpCircle; // Default icon if code not found
};
