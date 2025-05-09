import type { LocationDetails, CurrentWeather, AirQuality } from '@/types/weatherapi';
import { LocationInfo } from './LocationInfo';
import { WeatherCard } from './WeatherCard';
import { AqiCard } from './AqiCard';

interface WeatherDisplayProps {
  locationDetails: LocationDetails;
  currentWeatherData: CurrentWeather;
  airQualityData?: AirQuality | null; // AQI data is optional
}

export function WeatherDisplay({ locationDetails, currentWeatherData, airQualityData }: WeatherDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-primary">BreezeView</h1>
        <p className="text-muted-foreground text-lg mt-2">Your personal weather and air quality assistant.</p>
      </header>
      
      {locationDetails && <LocationInfo city={locationDetails.name} country={locationDetails.country} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {currentWeatherData && <WeatherCard data={currentWeatherData} />}
        {/* AqiCard will handle undefined/null airQualityData internally */}
        <AqiCard data={airQualityData} />
      </div>

      <footer className="text-center mt-12 text-sm text-muted-foreground">
        <p>Weather and Air Quality data provided by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">WeatherAPI.com</a>.</p>
        <p>&copy; {new Date().getFullYear()} BreezeView. All rights reserved.</p>
      </footer>
    </div>
  );
}
