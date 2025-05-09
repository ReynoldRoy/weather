export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CloudsData {
  all: number;
}

export interface SysData {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface AqiMain {
  aqi: number; // Air Quality Index (1-5)
}

export interface Pollutants {
  co: number;  // Carbon monoxide
  no: number;  // Nitrogen monoxide
  no2: number; // Nitrogen dioxide
  o3: number;  // Ozone
  so2: number; // Sulphur dioxide
  pm2_5: number; // Fine particles matter
  pm10: number; // Coarse particulate matter
  nh3: number; // Ammonia
}

export interface AqiDataEntry {
  main: AqiMain;
  components: Pollutants;
  dt: number;
}

export interface AqiData {
  coord: Coordinates;
  list: AqiDataEntry[];
}

export interface LocationInfo {
  name: string;
  country: string;
}

export interface ReverseGeocodeEntry {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
