export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string; // URL path
  code: number;
}

export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number; // 1-6 (Good, Moderate, Unhealthy for Sensitive, Unhealthy, Very Unhealthy, Hazardous)
  "gb-defra-index": number;
}

export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number; // 1 = Yes, 0 = No
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number; // Cloud cover as percentage
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality?: AirQuality; // Included if aqi=yes in query
}

export interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
}

// Simplified type for what page.tsx will store for location name
export interface LocationDetails {
  name: string;
  country: string;
}
