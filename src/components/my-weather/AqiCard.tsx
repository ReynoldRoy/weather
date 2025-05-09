import type { AirQuality } from '@/types/weatherapi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAqiInfo } from '@/utils/aqiHelper';
import { Leaf } from 'lucide-react';

interface AqiCardProps {
  data?: AirQuality | null;
}

const PollutantItem: React.FC<{ name: string; value?: number; unit: string }> = ({ name, value, unit }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0">
    <span className="text-muted-foreground">{name}</span>
    {value !== undefined ? (
        <span className="font-medium text-foreground">{value.toFixed(1)} <span className="text-xs">{unit}</span></span>
    ) : (
        <span className="text-muted-foreground text-xs">N/A</span>
    )}
  </div>
);

export function AqiCard({ data }: AqiCardProps) {
  const aqiInfo = getAqiInfo(data?.['us-epa-index']);
  const AqiIconComponent = aqiInfo.icon; // Renamed for clarity

  const cardHeaderBgClass = data ? "bg-accent/90" : "bg-muted/50"; // Dynamic background based on data availability
  const cardHeaderTextColorClass = data ? "text-accent-foreground" : "text-muted-foreground";


  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden">
      <CardHeader className={`${cardHeaderBgClass} p-6 ${cardHeaderTextColorClass} rounded-t-xl`}>
        <div className="flex items-center justify-between">
           <CardTitle className="text-2xl">Air Quality</CardTitle>
           <Leaf size={40} className={data ? "text-accent-foreground/80" : "text-muted-foreground/80"} />
        </div>
        <CardDescription className={`${data ? 'text-accent-foreground/90' : 'text-muted-foreground/90'} pt-1 text-lg`}>
          {data ? "Current Air Quality Index (AQI)" : "AQI Data Not Available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="text-center mb-4">
            <AqiIconComponent size={52} className={`mx-auto mb-3 ${aqiInfo.colorClass}`} />
            <Badge 
              variant="outline" 
              className={`px-4 py-2 text-lg border-2 ${aqiInfo.colorClass.replace('text-', 'border-').replace('destructive', 'destructive/50')} ${aqiInfo.colorClass.replace('text-', 'bg-')}/10`}
            >
              {aqiInfo.level} {data ? `(EPA: ${data['us-epa-index']})` : ''}
            </Badge>
            <p className="text-sm text-muted-foreground mt-3 px-4 max-w-xs mx-auto">{aqiInfo.description}</p>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground border-t pt-4">Pollutant Details:</h3>
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <PollutantItem name="PM2.5" value={data.pm2_5} unit="μg/m³" />
            <PollutantItem name="PM10" value={data.pm10} unit="μg/m³" />
            <PollutantItem name="O₃" value={data.o3} unit="μg/m³" />
            <PollutantItem name="NO₂" value={data.no2} unit="μg/m³" />
            <PollutantItem name="SO₂" value={data.so2} unit="μg/m³" />
            <PollutantItem name="CO" value={data.co} unit="μg/m³" />
          </div>
        ) : (
           <p className="text-sm text-muted-foreground">Detailed pollutant data is not available.</p>
        )}
      </CardContent>
    </Card>
  );
}
