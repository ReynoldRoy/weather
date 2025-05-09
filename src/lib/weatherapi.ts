import type { Coordinates, WeatherApiResponse } from '@/types/weatherapi';
import { WEATHERAPI_COM_API_KEY } from './config';

const API_BASE_URL = 'https://api.weatherapi.com/v1';

async function fetchData<T>(url: string): Promise<T> {
  if (!WEATHERAPI_COM_API_KEY) {
    throw new Error('WeatherAPI.com API key is not configured.');
  }
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function getWeatherAndAqi(coords: Coordinates): Promise<WeatherApiResponse> {
  // Construct the Q parameter for WeatherAPI: "latitude,longitude"
  const queryParam = `${coords.lat},${coords.lon}`;
  const url = `${API_BASE_URL}/current.json?key=${WEATHERAPI_COM_API_KEY}&q=${queryParam}&aqi=yes`;
  return fetchData<WeatherApiResponse>(url);
}
