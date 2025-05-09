import type { WeatherData, AqiData, LocationInfo as LocationDetails } from '@/types/openweather';
import { LocationInfo } from './LocationInfo';
import { WeatherCard } from './WeatherCard';
import { AqiCard } from './AqiCard';

interface WeatherDisplayProps {
  locationName: LocationDetails;
  weatherData: WeatherData;
  aqiData: AqiData;
}

export function WeatherDisplay({ locationName, weatherData, aqiData }: WeatherDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-primary">BreezeView</h1>
        <p className="text-muted-foreground text-lg mt-2">Your personal weather and air quality assistant.</p>
      </header>
      
      {locationName && <LocationInfo city={locationName.name} country={locationName.country} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {weatherData && <WeatherCard data={weatherData} />}
        {aqiData && <AqiCard data={aqiData} />}
      </div>

      <footer className="text-center mt-12 text-sm text-muted-foreground">
        <p>Weather and Air Quality data provided by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">OpenWeatherMap</a>.</p>
        <p>&copy; {new Date().getFullYear()} BreezeView. All rights reserved.</p>
      </footer>
    </div>
  );
}
