import type { Coordinates, WeatherData, AqiData, LocationInfo, ReverseGeocodeEntry } from '@/types/openweather';
import { OPENWEATHERMAP_API_KEY } from './config';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_API_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

async function fetchData<T>(url: string): Promise<T> {
  if (!OPENWEATHERMAP_API_KEY) {
    throw new Error('OpenWeatherMap API key is not configured.');
  }
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }
  return response.json();
}

export async function getWeather(coords: Coordinates): Promise<WeatherData> {
  const url = `${API_BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
  return fetchData<WeatherData>(url);
}

export async function getAqi(coords: Coordinates): Promise<AqiData> {
  const url = `${API_BASE_URL}/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHERMAP_API_KEY}`;
  return fetchData<AqiData>(url);
}

export async function getLocationName(coords: Coordinates): Promise<LocationInfo> {
  const url = `${GEO_API_BASE_URL}/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`;
  const data = await fetchData<ReverseGeocodeEntry[]>(url);
  if (data && data.length > 0) {
    return { name: data[0].name, country: data[0].country };
  }
  throw new Error('Could not determine location name.');
}
