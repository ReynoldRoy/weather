import type { WeatherData } from '@/types/openweather';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { getWeatherIconComponent } from '@/utils/weatherIconMap';

interface WeatherCardProps {
  data: WeatherData;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | number; unit?: string }> = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
    <div className="flex items-center text-muted-foreground">
      <Icon className="mr-2 h-5 w-5" />
      <span>{label}</span>
    </div>
    <span className="font-medium text-foreground">{value}{unit}</span>
  </div>
);


export function WeatherCard({ data }: WeatherCardProps) {
  const WeatherIcon = getWeatherIconComponent(data.weather[0].icon);

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Current Weather</CardTitle>
          <WeatherIcon size={48} className="text-chart-4" />
        </div>
        <CardDescription className="text-primary-foreground/80 pt-1 text-lg">
          {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center mb-6">
          <p className="text-6xl font-bold text-foreground">{Math.round(data.main.temp)}°C</p>
          <p className="text-muted-foreground">Feels like {Math.round(data.main.feels_like)}°C</p>
        </div>
        
        <div className="space-y-1">
          <DetailItem icon={Thermometer} label="Humidity" value={data.main.humidity} unit="%" />
          <DetailItem icon={Wind} label="Wind Speed" value={data.wind.speed} unit=" m/s" />
          <DetailItem icon={Gauge} label="Pressure" value={data.main.pressure} unit=" hPa" />
          <DetailItem icon={Eye} label="Visibility" value={data.visibility / 1000} unit=" km" />
        </div>

        <div className="flex justify-between text-sm text-muted-foreground pt-4">
            <span>Min: {Math.round(data.main.temp_min)}°C</span>
            <span>Max: {Math.round(data.main.temp_max)}°C</span>
        </div>
      </CardContent>
    </Card>
  );
}
