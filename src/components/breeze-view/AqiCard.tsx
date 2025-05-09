import type { AirQuality } from '@/types/weatherapi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAqiInfo } from '@/utils/aqiHelper';
import { Leaf } from 'lucide-react'; // ShieldAlert was not used, keeping Leaf

interface AqiCardProps {
  data?: AirQuality | null; // Data can be undefined or null if not available
}

const PollutantItem: React.FC<{ name: string; value?: number; unit: string }> = ({ name, value, unit }) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
    <span className="text-muted-foreground">{name}</span>
    {value !== undefined ? (
        <span className="font-medium text-foreground">{value.toFixed(2)} <span className="text-xs">{unit}</span></span>
    ) : (
        <span className="text-muted-foreground text-xs">N/A</span>
    )}
  </div>
);

export function AqiCard({ data }: AqiCardProps) {
  const aqiInfo = getAqiInfo(data?.['us-epa-index']); // Pass the US EPA index
  const AqiIcon = aqiInfo.icon;

  if (!data) {
    return (
      <Card className="w-full shadow-lg rounded-xl">
        <CardHeader className={`bg-accent/80 p-6 text-accent-foreground`}>
            <div className="flex items-center justify-between">
               <CardTitle className="text-2xl">Air Quality</CardTitle>
               <Leaf size={40} />
            </div>
             <CardDescription className="text-accent-foreground/80 pt-1 text-lg">
                Current Air Quality Index (AQI)
            </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <AqiIcon size={48} className={`mx-auto mb-2 ${aqiInfo.colorClass}`} />
             <Badge 
              variant="outline" 
              className={`px-4 py-2 text-xl border-2 ${aqiInfo.colorClass.replace('text-', 'border-').replace('destructive', 'destructive/50')} ${aqiInfo.colorClass.replace('text-', 'bg-')}/10`}
            >
              {aqiInfo.level}
            </Badge>
            <p className="text-sm text-muted-foreground mt-3 px-4">{aqiInfo.description}</p>
          </div>
           <h3 className="text-lg font-semibold text-foreground border-t pt-4">Pollutant Details:</h3>
           <p className="text-sm text-muted-foreground">Detailed pollutant data may not be available with this AQI summary.</p>
        </CardContent>
      </Card>
    );
  }


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
              {aqiInfo.level} (US EPA Index: {data['us-epa-index']})
            </Badge>
          <p className="text-sm text-muted-foreground mt-3 px-4">{aqiInfo.description}</p>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground border-t pt-4">Pollutant Details:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <PollutantItem name="PM2.5" value={data.pm2_5} unit="μg/m³" />
          <PollutantItem name="PM10" value={data.pm10} unit="μg/m³" />
          <PollutantItem name="O₃ (Ozone)" value={data.o3} unit="μg/m³" />
          <PollutantItem name="NO₂ (Nitrogen Dioxide)" value={data.no2} unit="μg/m³" />
          <PollutantItem name="SO₂ (Sulphur Dioxide)" value={data.so2} unit="μg/m³" />
          <PollutantItem name="CO (Carbon Monoxide)" value={data.co} unit="μg/m³" />
        </div>
      </CardContent>
    </Card>
  );
}
