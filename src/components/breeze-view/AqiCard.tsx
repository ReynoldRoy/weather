import type { AqiData } from '@/types/openweather';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAqiInfo } from '@/utils/aqiHelper';
import { ShieldAlert, Leaf } from 'lucide-react';

interface AqiCardProps {
  data: AqiData;
}

const PollutantItem: React.FC<{ name: string; value: number; unit: string }> = ({ name, value, unit }) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
    <span className="text-muted-foreground">{name}</span>
    <span className="font-medium text-foreground">{value.toFixed(2)} <span className="text-xs">{unit}</span></span>
  </div>
);

export function AqiCard({ data }: AqiCardProps) {
  if (!data.list || data.list.length === 0) {
    return (
      <Card className="w-full shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Air Quality Index (AQI)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">AQI data is currently unavailable.</p>
        </CardContent>
      </Card>
    );
  }

  const currentAqi = data.list[0];
  const aqiInfo = getAqiInfo(currentAqi.main.aqi);
  const AqiIcon = aqiInfo.icon;

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className={`bg-accent/80 p-6 text-accent-foreground`}>
        <div className="flex items-center justify-between">
           <CardTitle className="text-2xl">Air Quality</CardTitle>
           <Leaf size={40} />
        </div>
        <CardDescription className="text-accent-foreground/80 pt-1 text-lg">
          Current Air Quality Index (AQI)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center mb-6">
            <AqiIcon size={48} className={`mx-auto mb-2 ${aqiInfo.colorClass}`} />
            <Badge 
              variant="outline" 
              className={`px-4 py-2 text-xl border-2 ${aqiInfo.colorClass.replace('text-', 'border-').replace('destructive', 'destructive/50')} ${aqiInfo.colorClass.replace('text-', 'bg-')}/10`}
            >
              {aqiInfo.level} (AQI: {currentAqi.main.aqi})
            </Badge>
          <p className="text-sm text-muted-foreground mt-3 px-4">{aqiInfo.description}</p>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground border-t pt-4">Pollutant Details:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <PollutantItem name="PM2.5" value={currentAqi.components.pm2_5} unit="μg/m³" />
          <PollutantItem name="PM10" value={currentAqi.components.pm10} unit="μg/m³" />
          <PollutantItem name="O₃ (Ozone)" value={currentAqi.components.o3} unit="μg/m³" />
          <PollutantItem name="NO₂ (Nitrogen Dioxide)" value={currentAqi.components.no2} unit="μg/m³" />
          <PollutantItem name="SO₂ (Sulphur Dioxide)" value={currentAqi.components.so2} unit="μg/m³" />
          <PollutantItem name="CO (Carbon Monoxide)" value={currentAqi.components.co} unit="μg/m³" />
        </div>
      </CardContent>
    </Card>
  );
}
