import type { LocationDetails, CurrentWeather, AirQuality, Forecast } from '@/types/weatherapi';
import { LocationInfo } from './LocationInfo';
import { WeatherCard } from './WeatherCard';
import { AqiCard } from './AqiCard';
import { HourlyForecastCard } from './HourlyForecastCard';
import { DailyForecastCard } from './DailyForecastCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeatherDisplayProps {
  locationDetails: LocationDetails;
  currentWeatherData: CurrentWeather;
  airQualityData?: AirQuality | null;
  forecastData: Forecast;
}

export function WeatherDisplay({ locationDetails, currentWeatherData, airQualityData, forecastData }: WeatherDisplayProps) {
  const todayHourlyForecast = forecastData.forecastday[0]?.hour || [];
  const dailyForecast = forecastData.forecastday || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">My Weather</h1>
          <p className="text-muted-foreground text-lg mt-2">Your personal weather and air quality assistant.</p>
        </div>
        {/* AuthButton was here */}
      </header>
      
      {locationDetails && <LocationInfo city={locationDetails.name} country={locationDetails.country} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {currentWeatherData && <WeatherCard data={currentWeatherData} />}
        <AqiCard data={airQualityData} />
      </div>

      <Tabs defaultValue="hourly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:w-1/3 mx-auto mb-6">
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
          <TabsTrigger value="daily">3-Day Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="hourly">
          {todayHourlyForecast.length > 0 ? (
            <HourlyForecastCard hourlyData={todayHourlyForecast} />
          ) : (
            <p className="text-center text-muted-foreground">Hourly forecast data is unavailable.</p>
          )}
        </TabsContent>
        <TabsContent value="daily">
          {dailyForecast.length > 0 ? (
            <DailyForecastCard dailyData={dailyForecast} />
          ) : (
            <p className="text-center text-muted-foreground">Daily forecast data is unavailable.</p>
          )}
        </TabsContent>
      </Tabs>

      <footer className="text-center mt-12 text-sm text-muted-foreground">
        <p>Weather and Air Quality data provided by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">WeatherAPI.com</a>.</p>
        <p>&copy; {new Date().getFullYear()} My Weather. All rights reserved.</p>
      </footer>
    </div>
  );
}
