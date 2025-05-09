import type { ForecastDay } from '@/types/weatherapi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherIconComponent } from '@/utils/weatherIconMap';
import { format } from 'date-fns';
import { CalendarDays, Sunrise, Sunset, Droplets } from 'lucide-react';

interface DailyForecastCardProps {
  dailyData: ForecastDay[];
}

export function DailyForecastCard({ dailyData }: DailyForecastCardProps) {
  if (!dailyData || dailyData.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <CalendarDays className="mr-2 h-6 w-6 text-primary" /> Daily Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Daily forecast data is not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-background border-b">
        <CardTitle className="flex items-center text-xl text-foreground">
          <CalendarDays className="mr-2 h-6 w-6 text-primary" /> 3-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {dailyData.map((dayForecast) => {
            const WeatherIcon = getWeatherIconComponent(dayForecast.day.condition.code, 1); // Assume day for daily icon
            const dayName = format(new Date(dayForecast.date_epoch * 1000), 'EEE');
            const dateDisplay = format(new Date(dayForecast.date_epoch * 1000), 'MMM d');

            return (
              <div key={dayForecast.date_epoch} className="p-4 grid grid-cols-3 sm:grid-cols-5 items-center gap-2 hover:bg-muted/30 transition-colors">
                <div className="col-span-1 sm:col-span-1 flex flex-col">
                  <p className="font-semibold text-foreground text-lg">{dayName}</p>
                  <p className="text-xs text-muted-foreground">{dateDisplay}</p>
                </div>
                <div className="col-span-1 sm:col-span-1 flex justify-center items-center">
                   <WeatherIcon size={36} className="text-accent" />
                </div>
                <div className="col-span-1 sm:col-span-1 text-center sm:text-left">
                  <p className="text-lg text-foreground">
                    {Math.round(dayForecast.day.maxtemp_c)}° / {Math.round(dayForecast.day.mintemp_c)}°C
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{dayForecast.day.condition.text}</p>
                </div>
                <div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-2 sm:mt-0">
                    <div className="flex items-center">
                        <Droplets size={14} className="mr-1 text-primary/70"/> Chance of rain: {dayForecast.day.daily_chance_of_rain}%
                    </div>
                    <div className="flex items-center">
                        <Sunrise size={14} className="mr-1 text-chart-4"/> Sunrise: {dayForecast.astro.sunrise}
                    </div>
                    <div className="flex items-center">
                        UV: {dayForecast.day.uv}
                    </div>
                    <div className="flex items-center">
                        <Sunset size={14} className="mr-1 text-chart-1"/> Sunset: {dayForecast.astro.sunset}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
