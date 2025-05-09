import { MapPin } from 'lucide-react';

interface LocationInfoProps {
  city: string;
  country: string;
}

export function LocationInfo({ city, country }: LocationInfoProps) {
  return (
    <div className="mb-6 text-center">
      <div className="flex items-center justify-center text-2xl font-semibold text-foreground">
        <MapPin className="mr-2 h-7 w-7 text-accent" />
        <span>{city}, {country}</span>
      </div>
    </div>
  );
}
