import type { CurrentWeather } from '@/types/weatherapi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Thermometer, Wind, Eye, Gauge, SunMedium } from 'lucide-react'; // Replaced Droplets with SunMedium for UV
import { getWeatherIconComponent } from '@/utils/weatherIconMap';

interface WeatherCardProps {
  data: CurrentWeather;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | number; unit?: string }> = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0">
    <div className="flex items-center text-muted-foreground">
      <Icon className="mr-2.5 h-5 w-5" />
      <span>{label}</span>
    </div>
    <span className="font-medium text-foreground">{value}{unit}</span>
  </div>
);


export function WeatherCard({ data }: WeatherCardProps) {
  const WeatherIcon = getWeatherIconComponent(data.condition.code, data.is_day);

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-primary/90 p-6 text-primary-foreground rounded-t-xl">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Current Weather</CardTitle>
          <WeatherIcon size={48} className="text-primary-foreground/80" />
        </div>
        <CardDescription className="text-primary-foreground/90 pt-1 text-lg">
          {data.condition.text}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="text-center mb-4">
          <p className="text-6xl font-bold text-foreground">{Math.round(data.temp_c)}°C</p>
          <p className="text-muted-foreground text-lg">Feels like {Math.round(data.feelslike_c)}°C</p>
        </div>
        
        <div className="space-y-1.5">
          <DetailItem icon={Thermometer} label="Humidity" value={data.humidity} unit="%" />
          <DetailItem icon={Wind} label="Wind Speed" value={data.wind_kph} unit=" kph" />
          <DetailItem icon={Gauge} label="Pressure" value={data.pressure_mb} unit=" mb" />
          <DetailItem icon={Eye} label="Visibility" value={data.vis_km} unit=" km" />
          <DetailItem icon={SunMedium} label="UV Index" value={data.uv} unit="" />
        </div>
      </CardContent>
    </Card>
  );
}
