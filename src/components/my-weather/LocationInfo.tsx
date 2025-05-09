import { MapPin } from 'lucide-react';

interface LocationInfoProps {
  city: string;
  country: string;
}

export function LocationInfo({ city, country }: LocationInfoProps) {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center text-3xl font-semibold text-foreground">
        <MapPin className="mr-3 h-8 w-8 text-accent" />
        <span>{city}, {country}</span>
      </div>
    </div>
  );
}
