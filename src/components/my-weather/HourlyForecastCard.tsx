import type { HourForecast } from '@/types/weatherapi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getWeatherIconComponent } from '@/utils/weatherIconMap';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface HourlyForecastCardProps {
  hourlyData: HourForecast[];
}

export function HourlyForecastCard({ hourlyData }: HourlyForecastCardProps) {
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Clock className="mr-2 h-6 w-6 text-primary" /> Hourly Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Hourly forecast data is not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-background border-b">
        <CardTitle className="flex items-center text-xl text-foreground">
           <Clock className="mr-2 h-6 w-6 text-primary" /> Hourly Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-0">
            {hourlyData.map((hour, index) => {
              const WeatherIcon = getWeatherIconComponent(hour.condition.code, hour.is_day);
              return (
                <div key={hour.time_epoch} className={`flex flex-col items-center justify-between p-4 min-w-[100px] border-r ${index === hourlyData.length - 1 ? 'border-r-0' : 'border-border'}`}>
                  <p className="text-sm text-muted-foreground">{format(new Date(hour.time), "ha")}</p>
                  <WeatherIcon size={32} className="my-2 text-accent" />
                  <p className="text-lg font-semibold text-foreground">{Math.round(hour.temp_c)}°C</p>
                  <p className="text-xs text-muted-foreground mt-1"> {hour.chance_of_rain}% rain</p>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
