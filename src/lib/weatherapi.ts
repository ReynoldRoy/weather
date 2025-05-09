import type { Coordinates, WeatherApiResponse } from '@/types/weatherapi';
import { WEATHERAPI_COM_API_KEY } from './config';

const API_BASE_URL = 'https://api.weatherapi.com/v1';

async function fetchData<T>(url: string): Promise<T> {
  if (!WEATHERAPI_COM_API_KEY || WEATHERAPI_COM_API_KEY === "YOUR_API_KEY") { // Check for placeholder
    throw new Error('WeatherAPI.com API key is not configured. Please set it in src/lib/config.ts.');
  }
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

/**
 * Fetches current weather, 3-day forecast, and air quality index data.
 */
export async function getWeatherData(coords: Coordinates): Promise<WeatherApiResponse> {
  const queryParam = `${coords.lat},${coords.lon}`;
  // Fetch forecast.json which includes current, forecast, and aqi data.
  // Requesting 3 days of forecast. Alerts are not requested to keep it simple.
  const url = `${API_BASE_URL}/forecast.json?key=${WEATHERAPI_COM_API_KEY}&q=${queryParam}&days=3&aqi=yes&alerts=no`;
  return fetchData<WeatherApiResponse>(url);
}
